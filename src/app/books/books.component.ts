import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book.model';
import {BookService} from '../shared/book.service';
import {CartService} from '../shared/cart.service';
import {faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  search = '';
  books : Book[];
  nbCart: number = 0;
  faQuoteLeft = faQuoteLeft;
  faQuoteRight = faQuoteRight;
  searchSubject: Subject<string> = new Subject();
  searchResult: Book[] = [];

  constructor(private bookService: BookService, private cartService: CartService) { }

  ngOnInit() {
    this.bookService.getBooks().then(
      result => {
        this.books = result;
      }
    )
    this.nbCart = this.cartService.retrieveContent().length;
    this.initSearch();
  }

  initSearch() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchValue => {
        return this.books.filter(data => {
          return data.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            data.isbn.toLowerCase().includes(searchValue.toLowerCase()) ||
            this.searchIntoBookSynopsis(data.synopsis, searchValue).length == 0
        });
      })
    ).subscribe(result => {
        this.searchResult.push(result);
      });
  }

  searchBook($event) {
    this.searchSubject.next($event.target.value);
  }

  addItemToCart (item){
    this.cartService.addItem(item);
    this.nbCart = this.cartService.retrieveContent().length;
    this.cartService.bookAdded.next(this.nbCart);
  }

  searchIntoBookSynopsis(synopsis, value) {
    return synopsis.filter(data => {
      return data.toLowerCase().includes(value.toLowerCase());
    })
  }
}
