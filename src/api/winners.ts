import { IWinner } from '../types';
import { UrlPath, WINNERS_PAGE_LIMIT } from './data';

export default class WinnersApi {
  static async getWinners(page: number = 1, sortBy: string, order: string) {
    const url = `${UrlPath.BASE}/${UrlPath.WINNERS}/?_page=${page}&_limit=${WINNERS_PAGE_LIMIT}&_sort=${sortBy}&_order=${order}`;
    try {
      const response = await fetch(url);
      const winners: IWinner[] = await response.json();
      const totalRecords = response.headers.get('X-Total-Count');
      return { winners, totalRecords };
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async getWinner(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.WINNERS}/${id}`;
    try {
      const response = await fetch(url);
      const winner: IWinner = await response.json();
      return winner;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async createWinner(winnerData: IWinner) {
    const url = `${UrlPath.BASE}/${UrlPath.WINNERS}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerData),
      });
      const createdWinner: IWinner = await response.json();
      return createdWinner;
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}
