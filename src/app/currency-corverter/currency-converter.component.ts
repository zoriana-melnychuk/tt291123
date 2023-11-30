import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  amount: number = 0;
  convertedAmount: number = 0;
  reversedConvertedAmount: number = 0;
  currencyFrom: string = 'UAH';
  currencyTo: string = 'USD';
  currencies: string[] = ['UAH', 'USD', 'EUR'];
  exchangeRates: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://api.exchangerate-api.com/v4/latest/USD').subscribe((data: any) => {
      this.exchangeRates = data.rates;
    });
  }

  convert(): void {
    this.convertedAmount = this.amount * this.exchangeRates[this.currencyTo] / this.exchangeRates[this.currencyFrom];
    this.reversedConvertedAmount = this.amount / (this.exchangeRates[this.currencyTo] / this.exchangeRates[this.currencyFrom]);
  }
}
