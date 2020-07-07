import {Component} from '@angular/core';
import {faBook, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {CartService} from './shared/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  faShoppingCart = faShoppingCart;
  faBook = faBook;
  nbBooksIntoCart : number= 0;
  public isMenuCollapsed = true;

  constructor(private cartService:CartService, private toastr: ToastrService){}

  ngOnInit(){
    this.cartService.bookAdded.subscribe((data) => {
      this.nbBooksIntoCart = data;
      this.toastr.success('Livre ajouté au panier');
    });
  }

}
