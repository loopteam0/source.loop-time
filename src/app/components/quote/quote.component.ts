import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  quotes;


  constructor( private request: SearchService) {
    this.quotes = [];

  }

  ngOnInit() {
   this.getQuote();
  }

  /// get quote
  getQuote() {
    this.request.getQuotes().pipe(
    ).subscribe(data => this.quotes = data);

  }
}
