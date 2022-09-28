import * as calcUtil from './calc.util';

/**
 *
 * Calculate repayment amount per month.
 * Exactly the same as PMT function of excel.
 *
 * @param ir yearly interest rate
 * @param n repayment periods in month
 * @param pv principal amount
 * @param fv principal amount after repayment finished (i.e. 0)
 // tslint:disable-next-line:max-line-length
  * @param type With Type=0, the interest is computed for 1 month because the payment is assumed to be at the end of the month.
  *             or Type=1, the interest is computed for 0 months because the payment is at the beginning of the month.
  */
export function calculateMonthlyRepayment(
  ir: number,
  n: number,
  pv: number,
  fv?: number,
  type = 0,
) {
  ir = ir / 100 / 12;
  return (
    ((pv - fv * Math.pow(1 + ir, -n)) * ir) /
    ((1 + ir * type) * (1 - Math.pow(1 + ir, -n)))
  );
}

/**
 *
 * Calculate monthly money collection fee.
 *
 * @param rentRevenue rent revenue per month
 */
export function calculateRentCollectionFee(rent: number) {
  return rent * 0.05;
}

/**
 * 年末残債計算
 * @param periodInMonths period in month
 * @param interestRate yearly rate
 * @param principal loan amount
 * @export
 */
export function calculatePrincipalPayment(
  periodInMonths: number,
  interestRate: number,
  principal: number,
) {
  const principalPaymentList = [];

  // 回数
  const periodList = [];
  for (let i = 0; i < periodInMonths; i++) {
    periodList.push(i + 1);
  }

  // 元金部分
  for (let i = 0; i < periodInMonths; i++) {
    const principalPaymentAtThePeriod = calcUtil.ppmt(
      (interestRate * 0.01) / 12,
      i + 1,
      periodInMonths,
      principal,
      0,
    );
    principalPaymentList.push(principalPaymentAtThePeriod);
  }
  return principalPaymentList;
}

export function calculateRemainingDebt(principalPaymentList, principal) {
  const length = principalPaymentList.length;
  const remainingDebt = [];
  let principalPrev = principal;
  for (let i = 0; i < length; i++) {
    remainingDebt.push(principalPrev + principalPaymentList[i]);
    principalPrev = remainingDebt[i];
  }
  return remainingDebt;
}

export function calculateEndOfYearRemainigDebt(remainingDebt, simulationYears) {
  const length = remainingDebt.length;
  const remainingDebtAtEndOfYear = new Array(simulationYears).fill(0);
  let idx = 0;
  for (let i = 0; i < length; i++) {
    if (i % 12 === 11) {
      remainingDebtAtEndOfYear[idx] = calcUtil.round(
        remainingDebt[i] * 10000,
        0,
      );
      idx++;
    }
  }
  return remainingDebtAtEndOfYear;
}
