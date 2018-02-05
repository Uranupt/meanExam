import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';
import { Http } from '@angular/http';
import { Router } from '@angular/router'

@Injectable()
export class DataService {
  user: BehaviorSubject<string> = new BehaviorSubject('');
  questions: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http, private _router: Router) {
  }

  logUser(newUser: string): void{
    this._http.post('/lognew', {user: newUser}).subscribe(
      res => this.updateData(),
      errorResponse => console.log(errorResponse)
    );
  };

  updateData(): void{
    this._http.get('/check').subscribe(
      res => this.user.next(res.json().user),
      errorResponse => console.log(errorResponse)
    );
    this._http.get('/questions').subscribe(
      res => this.questions.next(res.json()),
      errorResponse => console.log(errorResponse)
    );
  };

  askNew(newQuestion): void {
    this._http.post('/asknew', {question: newQuestion}).subscribe(
      res => this._router.navigate(['/']),
      errorResponse => console.log(errorResponse)
    )
  };

  answerNew(data): void{
    this._http.post('/answernew', data).subscribe(
      res => this._router.navigate(['/']),
      errorResponse => console.log(errorResponse)
    )
  };

  newLike(data): void{
    this._http.post('/like', data).subscribe(
      res => this.updateData(),
      errorResponse => console.log(errorResponse)
    )
  }

}
