
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords'
})
export class NumberToWordsPipe implements PipeTransform {

  transform(value: number): string {
    return this.convertToWords(value);
  }

  private convertToWords(number: number): string {
    const oneDigit = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const twoDigit = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if(number>1000000)
    return 'out of bound';

    else{

    if (number === 0) {
      return 'zero';
    }

    if (number < 0) {
      return 'negative ' + this.convertToWords(Math.abs(number));
    }

    let words = '';

    if (number >= 1000) {
      words += this.convertToWords(Math.floor(number / 1000)) + ' thousand ';
      number %= 1000;
    }

    if (number >= 100) {
      words += oneDigit[Math.floor(number / 100)] + ' hundred ';
      number %= 100;
    }

    if (number > 0) {
      if (words !== '') {
        words += 'and ';
      }

      if (number < 10) {
        words += oneDigit[number];
      } else if (number < 20) {
        words += teens[number - 11];
      } else {
        const tens = Math.floor(number / 10);
        const ones = number % 10;
        words += twoDigit[tens] + (ones !== 0 ? '-' + oneDigit[ones] : '');
      }
    }

    return words.trim();
  }
  }
}
