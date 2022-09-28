export function round(number, precision) {
  const shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

/**
 * https://gist.github.com/pies/4166888
 *
 * @export
 * @param {*} rate 利率
 * @param {*} per 期：返済何期目か
 * @param {*} nper 期間：返済期間
 * @param {*} pv　現在価値：借入金額
 * @param {*} fv　将来価値：基本0
 * @param {*} type 支払い期日：0:期末, 1:期首
 * @returns
 */
export function ppmt(rate, per, nper, pv, fv, type?) {
  if (per < 1 || per >= nper + 1) return null;
  const pmt = this.pmt(rate, nper, pv, fv, type);
  const ipmt = this.ipmt(pv, pmt, rate, per - 1);
  return pmt - ipmt;
}

export function pmt(rate, nper, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv) / nper;

  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= 1 + rate;
  }

  return pmt;
}

export function ipmt(pv, pmt, rate, per) {
  const tmp = Math.pow(1 + rate, per);
  return 0 - (pv * tmp * rate + pmt * (tmp - 1));
}
