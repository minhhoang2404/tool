import BigNumber from 'bignumber.js';

export function getRate(valueFrom: number, valueTo: number) {
    return BigNumber(valueTo).dividedBy(valueFrom).precision(5).toNumber();
}

export function getValue(value: number, isFuture?: boolean) {
    const decimal = BigNumber(10).pow(isFuture ? 30 : 18);
    return BigNumber(value).dividedBy(decimal).precision(5).toNumber();
}