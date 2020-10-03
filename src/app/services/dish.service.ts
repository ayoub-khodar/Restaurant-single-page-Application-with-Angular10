import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import {DISHES} from '../shared/dishes';
import { Observable , of } from 'rxjs';
import { delay, map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHTTPMsgService} from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

 /* getDishes(): Promise<Dish[]>{
    return new Promise(resolve => {
      //Simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES),2000);
    });
  }

  getDish(id: string): Promise<Dish>{
    return new Promise(resolve => {
      //Simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
  });}

  getFeaturedDish(): Promise<Dish>{
    return new Promise(resolve => {
      //Simulate server latency with 2 sec delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
  });}*/
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseUrl + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseUrl + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true')
    .pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
    .pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    return this.http.put<Dish>(baseUrl + 'dishes/' + dish.id , dish , httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
}


