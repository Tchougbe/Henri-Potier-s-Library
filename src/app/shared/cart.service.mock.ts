import {Book} from './book.model';
import {Subject} from 'rxjs';

export class CartServiceMock {
  bookAdded = new Subject<number>();
  content = [
    {
      "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
      "title": "Henri Potier à l'école des sorciers",
      "price": 35,
      "cover": "http://henri-potier.xebia.fr/hp0.jpg",
      "synopsis": ["Synopsis1"]
    },
    {
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      "synopsis": ["Synopsis2"]
    },
    {
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      "synopsis": ["Synopsis2"]
    },
  ];

  commercialOffer = {
    "offers": [
      { "type": "percentage", "value": 5 },
      { "type": "minus", "value": 15 },
      { "type": "slice", "sliceValue": 100, "value": 12 }
    ]
  };

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
    return Promise.resolve(this.commercialOffer);
  }

}
