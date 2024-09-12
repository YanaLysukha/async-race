import { ICar } from '../types';

export enum UrlPath {
  BASE = 'http://127.0.0.1:3000',
  GARAGE = 'garage',
  WINNERS = 'winners',
  ENGINE = 'engine',
}

export const PAGE_LIMIT = 7;

export default class Api {
  static async getCars(page: number, limit: number = PAGE_LIMIT) {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}/?_page=${page}&_limit=${limit}`;
    try {
      const response = await fetch(url);
      const cars: ICar[] = await response.json();
      const carsAmount = response.headers.get('X-Total-Count');
      return { cars, carsAmount };
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}
