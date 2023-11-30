import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/UAH';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  amountFrom: number = 0;
  convertedAmount: number = 0;
  currencyFrom: string = 'UAH';
  currencyTo: string = 'USD';
  exchangeRates: any;
  [key: string]: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates(): void {
    this.http.get(EXCHANGE_RATE_API_URL).subscribe(
      (data: any) => {
        this.exchangeRates = data.rates;
        this.convertFrom();
      },
      (error: any) => {
        console.error('Failed to fetch exchange rates:', error);
        // Handle errors as needed
      }
    );
  }

  convertFrom(): void {
    if (this.isValidAmount('amountFrom')) {
      this.convertedAmount = this.amountFrom * this.getExchangeRate();
      this.convertedAmount = this.roundToTwoDecimals(this.convertedAmount);
    }
  }

  convertTo(): void {
    if (this.isValidAmount('convertedAmount')) {
      this.amountFrom = this.convertedAmount / this.getExchangeRate();
      this.amountFrom = this.roundToTwoDecimals(this.amountFrom);
    }
  }

  getExchangeRate(): number {
    return this.exchangeRates[this.currencyTo] / this.exchangeRates[this.currencyFrom];
  }

  roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  isValidAmount(fieldName: string): boolean {
    const value = this[fieldName];
    return !isNaN(value) && (value >= 0 || value === '');
  }
}

