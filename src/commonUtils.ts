import numeral from 'numeral';

export function getNumber (number: number) {
    return numeral(number).format("0,0");
}