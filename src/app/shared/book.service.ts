import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Promise<any>{
    return this.http.get('http://henri-potier.xebia.fr/books').toPromise();
  }

}
