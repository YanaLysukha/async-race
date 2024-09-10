import { ICar } from '../types';

export enum UrlPath {
  BASE = 'http://127.0.0.1:3000',
  GARAGE = 'garage',
  WINNERS = 'winners',
  ENGINE = 'engine',
}

export default class Api {
  static async getCars(): Promise<ICar[]> {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}`;
    try {
      const response = await fetch(url);
      const cars: ICar[] = await response.json();
      return cars;
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}
