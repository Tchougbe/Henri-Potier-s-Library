import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';
import {BookServiceMock} from '../shared/book.service.mock';
import {BookService} from '../shared/book.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CartServiceMock} from '../shared/cart.service.mock';
import {CartService} from '../shared/cart.service';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookToAdd =  {
    "isbn": "c30968db-cb1d-442e-ad0f-80e37c077f89",
    "title": "Henri Potier et la Coupe de feu",
    "price": 29,
    "cover": "http://henri-potier.xebia.fr/hp3.jpg",
    "synopsis": ["Synopsis4"]
  };

  const bookServiceMock = new BookServiceMock();
  const cartServiceMock = new CartServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent, FaIconComponent],
      schemas: [ NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BookService, useValue: bookServiceMock,
        },
        {
          provide: CartService, useValue: cartServiceMock,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when init component', () => {
    beforeEach(fakeAsync(() => {
      spyOn(bookServiceMock, 'getBooks').and.callThrough();
      spyOn(cartServiceMock, 'retrieveContent').and.callThrough();
      spyOn(component, 'initSearch');
      component.ngOnInit();
      flushMicrotasks();
    }));

    it('should retrieve books list', () => {
      expect(bookServiceMock.getBooks).toHaveBeenCalled();
      expect(component.books.length).toEqual(4);
    } );

    it('should retrieve nb articles of cart', () => {
      expect(cartServiceMock.retrieveContent).toHaveBeenCalled();
      expect(component.nbCart).toEqual(3);
    } );

    it('should init search subject', () => {
      expect(component.initSearch).toHaveBeenCalled();
    } );

  })

  describe('when adding item to cart', () => {
    beforeEach((() => {
      spyOn(cartServiceMock, 'addItem').and.callThrough();
      spyOn(cartServiceMock, 'retrieveContent').and.callThrough();
      component.addItemToCart(bookToAdd);
      fixture.detectChanges();
    }));

    it('should add item to cart', () => {
      expect(cartServiceMock.addItem).toHaveBeenCalledWith(bookToAdd);
    } )

    it('should update nb articles of cart', () => {
      expect(cartServiceMock.retrieveContent).toHaveBeenCalled();
      expect(component.nbCart).toEqual(4);
    } );

  })

});
