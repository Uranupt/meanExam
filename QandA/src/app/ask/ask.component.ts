import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Question } from '../question'

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  question = new Question();

  askNew = function(){
    this._dataService.askNew(this.question)
  }

  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

}
