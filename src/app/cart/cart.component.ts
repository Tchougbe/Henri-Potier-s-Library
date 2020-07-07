import {Component, OnInit} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {Offer} from '../shared/offer.model';
import {Book} from '../shared/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  price: number = 0;
  reducedPrice: number = 0;
  commercialOffers: Offer[];
  content: Book [];
  bookByOccurence;
  bookByCover;
  constructor( private cartService: CartService) { }

  async ngOnInit() {
    this.content = this.cartService.retrieveContent();
    if (this.content.length > 0 ) {
      this.price = this.cartService.sumPrice();
      await this.cartService.getCommercialOffers().then(result => {
        this.commercialOffers = result.offers;
      });
      this.chooseBestOffer();
    }
    this.bookByOccurence = this.content.reduce((prev, curr) => (prev[curr.title] = ++prev[curr.title] || 1, prev), []);
  }

  chooseBestOffer() {
    let possiblePrice = [];
    for(let i = 0; i<this.commercialOffers.length; i++) {
      if (this.commercialOffers[i].type === 'percentage') {
        possiblePrice.push(this.usePercentageOffer(this.commercialOffers[i].value));
      } else if (this.commercialOffers[i].type === 'minus') {
        possiblePrice.push(this.useMinusOffer(this.commercialOffers[i].value));
      } else if (this.commercialOffers[i].type === 'slice') {
        possiblePrice.push(this.useSliceOffer(this.commercialOffers[i].value, this.commercialOffers[i].sliceValue));
      }
    }
    this.reducedPrice = Math.min(...possiblePrice);
    return this.reducedPrice;
  }


  usePercentageOffer(offerValue) {
    return this.price - ((offerValue / 100) * this.price);
  }
  useMinusOffer(offerValue) {
    return this.price - offerValue;
  }


  useSliceOffer(offerValue, sliceValue) {
    if (this.price >= sliceValue) {
      let nbSlice = (this.price / sliceValue);
      return this.price - (Math.trunc(nbSlice)*offerValue);
    }
    return this.price;
  }
}
