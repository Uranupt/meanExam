import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  idx = null;
  question = new Question();

  like = function(idx){
    this._dataService.newLike({index: idx, question: this.question})
  }

  constructor(private _dataService: DataService, private _route: ActivatedRoute ) {

  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => this.idx = params.get('id')
    );

    this._dataService.questions.subscribe(
      questions => this.question = questions[this.idx]
    );

    this._dataService.updateData();
  }

}
