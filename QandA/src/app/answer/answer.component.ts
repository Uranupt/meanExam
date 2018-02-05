import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../answer';
import { Question } from '../question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  user = ''
  idx = null;
  question = new Question();
  answer = new Answer();

  newAnswer = function(){
    this.answer.name = this.user
    this._dataService.answerNew({question: this.question, answer: this.answer});
  }

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._route.paramMap.subscribe(
      params => this.idx = params.get('id')
    );

    this._dataService.user.subscribe(
      user => this.user = user
    );

    this._dataService.questions.subscribe(
      questions => this.question = questions[this.idx]
    );

    this._dataService.updateData();
  }

}
