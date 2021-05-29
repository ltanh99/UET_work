import { AfterViewChecked, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { ChannelData, Message, StreamChat, User } from 'stream-chat';
// import *  as StringeeClient from '../../../lib/latest.sdk.bundle.min.js';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  title = 'angular-chat';
  channel: ChannelData;
  username = '';
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  currentUser: User;
  id;
  name;
  chooseChannel;
  constructor(
    public route: ActivatedRoute) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.name = this.route.snapshot.queryParamMap.get('name');
    if (!this.id && !this.name) this.chooseChannel = 0
    this.joinChat(this.id,this.name);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  ngAfterViewChecked() {
    // this.scrollToBottom();    
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  changeChat(e?,i?) {
    console.log(e);
    // if (e.data) {
    //   this.joinChat(e.data.id, e.data.name);
    // }
    this.channel = e;
    this.messages = this.channel.state.messages;
    this.channel.on('message.new', event => {
      this.messages = [...this.messages, event.message];
    });

    this.chooseChannel = i;
  }
  async joinChat(channelId,channelName) {

    // const { username } = this;
    let username = JSON.parse(localStorage.getItem("common-info"))["username"];
    // let channelId = 'job';
    // let channelName = 'Tuyển dụng FPT';
    try {
      // const response = await axios.post('http://localhost:5500/join', {
      const response = await axios.post('http://128.199.207.230:5500/join', {
        username,
        channelId,
        channelName
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey);

      this.currentUser = await this.chatClient.setUser(
        {
          id: username,
          name: username,
        },
        token
      );

      const channel = this.chatClient.channel('team', 'job');
      await channel.watch();
      // this.channel = channel;
      // this.messages = channel.state.messages;
      // this.channel.on('message.new', event => {
      //   this.messages = [...this.messages, event.message];
      // });

      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.me["id"]}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
      // this.channel = this.channelList[0];
      if(channelId) {
        this.channelList.forEach((item,index) => {
          if (item.id == channelId) {
            this.channel = item;
            let tmpChannel = item;
            this.channelList.splice(index, 1);
            this.channelList.unshift(tmpChannel);
            this.chooseChannel = index;
            // this.channelList[0] = item;
            // this.channelList[index] = tmpChannel;
          }
        })
      } else {
        this.channel = this.channelList[0];
      }
      
      this.messages = this.channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }
}
