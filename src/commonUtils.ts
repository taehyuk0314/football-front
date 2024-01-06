import numeral from 'numeral';

export function getNumber (number: number) {
    return numeral(number).format("0,0");
}

/**
 * 로컬 스토리지 객체 취득
 * @param key 
 */
export function getLocalStorageObject(key: string) {
    const obj = localStorage.getItem(key);
    if (!obj) {
        return null;
    }
    return JSON.parse(obj);
}

   /**
     * 로컬 스토리지 객체 저장
     * @param key 
     * @param val 
     */
export function putLocalStorageObject(key: string, val: object): void {
    localStorage.setItem(key, JSON.stringify(val));
}
