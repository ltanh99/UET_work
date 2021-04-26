import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
    // console.log("data",this.data);
  }

}
