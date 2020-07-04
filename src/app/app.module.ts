import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksComponent} from './books/books.component';
import {HttpClientModule} from '@angular/common/http';
import {ReadMoreComponent} from './read-more/read-more.component';
import {CartComponent} from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ReadMoreComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
