import {Injectable} from '@angular/core';
import {Book} from './book.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  content = [];
  bookAdded = new Subject<number>();
  constructor(private http: HttpClient) { }

  addItem(item: Book) {
    this.content.push(item);
  }

  removeItem(item: Book) {
    this.content = this.content.filter(elt => elt.isbn != item.isbn);
  }

  sumPrice() {
    return this.content.map(item => item.price)
        .reduce((currentValue, nextValue) => currentValue + nextValue);
  }

  retrieveContent() {
    return this.content;
  }

  getCommercialOffers(): Promise<any> {
    const requestData = this.content.map(item => item.isbn)
      .reduce((currentValue, nextValue) => currentValue.concat(',' + nextValue));
    let url =  'http://henri-potier.xebia.fr/books/' + requestData + '/commercialOffers';
    return this.http.get(url).toPromise();
  }

}
