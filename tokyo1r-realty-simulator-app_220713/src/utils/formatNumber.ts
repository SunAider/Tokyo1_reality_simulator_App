import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fJpy(number: number) {
  return number.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
}

export function fTenThousandYen(number: number) {
  return (number / 10000).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) + '万円';
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}
