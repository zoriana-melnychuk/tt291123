import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  exchangeRates: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.http.get('https://api.exchangerate-api.com/v4/latest/UAH')
      .subscribe(data => {
        this.exchangeRates = data;
      });
  }
}
