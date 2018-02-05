import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tempusername = '';
  username = '';
  questions = [];
  modquestions= [];
  search='';

  constructor(private _dataService: DataService) { }


  filter = function(){
    var filstr = this.search.toLowerCase()
    this.modquestions = this.questions.filter(function(question){
      return question.title.toLowerCase().includes(filstr)
    })
  }

  logIn = function(){
    this._dataService.logUser(this.tempusername);
  };

  ngOnInit() {
    this._dataService.user.subscribe(
      user => this.username = user
    );
    this._dataService.questions.subscribe(
      questions => this.questions = questions
    );
    this._dataService.updateData();
  }

}
