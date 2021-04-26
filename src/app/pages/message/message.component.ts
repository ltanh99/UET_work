import { Component, OnInit } from '@angular/core';
// import *  as StringeeClient from '../../../lib/latest.sdk.bundle.min.js';

declare var StringeeClient: any;
declare var StringeeChat: any;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  ACCESS_TOKEN = "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1BMVjlhbjBVeXdRTk1RamhUMFdFU09yOE9aQkdEVzBXLTE2MTg5Nzk4NDUiLCJpc3MiOiJTS1BMVjlhbjBVeXdRTk1RamhUMFdFU09yOE9aQkdEVzBXIiwiZXhwIjoxNjIxNTcxODQ1LCJ1c2VySWQiOiIxIn0.7vY5sLCh78nF7-hDVQMJWXWjz3Gh6iJvAvNegXJn7D4";
  stringeeClient = new StringeeClient();
  stringeeChat;
  userId;
  listConversation: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.stringeeClient.connect(this.ACCESS_TOKEN);
    let ref = this;
    console.log(typeof(ref))
    if(this.stringeeClient) {
      localStorage.setItem("stringeeClient", JSON.stringify(this.stringeeClient))
    }

    this.stringeeChat= new StringeeChat(this.stringeeClient);
    if(this.stringeeChat) {
      localStorage.setItem("stringeeChat", JSON.stringify(this.stringeeChat))
    }
    this.userId = this.getCurrentUserIdFromAccessToken(this.ACCESS_TOKEN);
    this.renderLastConversationsAndMessages();
    this.stringeeClient.on('connect', function (ref) {
      let mes = new MessageComponent;
      console.log('++++++++++++++ connected to StringeeServer');
    });

    this.stringeeClient.on('authen', function (res) {
      console.log('authen', res);
    });
  
    this.stringeeClient.on('disconnect', function () {
      console.log('++++++++++++++ disconnected');
    });
    
  }

  logStringee(){
    
  }

  // Hàm lấy userId hiện tại của người dùng đăng nhập
  getCurrentUserIdFromAccessToken(token) {
    let decodedToken = this.decodeToken(token);
    return decodedToken.userId;
  }

  decodeToken(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

  // Hàm hiển thị các conversation gần nhất
  renderLastConversationsAndMessages() {
    let count = 25;
    let isAscending = false;
    let accessToken = this.ACCESS_TOKEN;
    let userId = this.getCurrentUserIdFromAccessToken(accessToken);
      this.stringeeChat.getLastConversations(25,isAscending,(status, code, message, convs)=> {
        console.log(1)
        localStorage.setItem("message",message);
      })
    
  }

  

}
