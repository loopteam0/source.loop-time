import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  quotes;
  loading;


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
