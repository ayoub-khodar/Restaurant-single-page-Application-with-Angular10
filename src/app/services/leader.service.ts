import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHTTPMsgService} from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseUrl + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
}

  getLeader(id: string): Observable<Leader>{
    return this.http.get<Leader>(baseUrl + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    }

  getLeaderIds(): Observable<number[] | any> {
      return this.getLeaders()
      .pipe(map(leaders => leaders.map(leader => leader.id)))
      .pipe(catchError(error => error));
    }

  putLeader(leader: Leader): Observable<Leader>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      };
  
      return this.http.put<Leader>(baseUrl + 'leadership/' + leader.id , leader , httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
}
