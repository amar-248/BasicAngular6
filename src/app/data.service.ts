import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { Post } from './post';
import { post } from '../../node_modules/@types/selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.URL}/posts`);
  }

  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>(`${this.URL}/posts`, newPost);
  }
}
