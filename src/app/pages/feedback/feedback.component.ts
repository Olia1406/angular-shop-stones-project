import { Component, OnInit } from '@angular/core';
import { IFeedb } from '../../shared/interfaces/feedb.interface';
import { Feedb } from '../../shared/models/feedb.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  userMessage:string;
  postedByUser: string;
  fbDate= new Date();
  feedbacks: Array<IFeedb> = [
    { postedBy: 'somebody2', message: 'jrehjfhjkhg trgh jgt gt', date: new Date() },
    { postedBy: 'somebody2', message: 'jdfkjv  jfkhjh je hjrhj h', date: new Date() }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  addFB(){
    const feedb = new Feedb(this.postedByUser,this.userMessage,this.fbDate );
    this.feedbacks.push(feedb);

  }

}
