import { IEngine } from '../types';
import { engineStatus, UrlPath } from './data';

export default class Api {
  static async startEngine(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.ENGINE}?id=${id}&status=${engineStatus.START}`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });
      const engineResult: IEngine = await response.json();
      return engineResult;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async stopEngine(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.ENGINE}?id=${id}&status=${engineStatus.STOP}`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });
      const engineResult: IEngine = await response.json();
      return engineResult;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async drive(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.ENGINE}?id=${id}&status=${engineStatus.DRIVE}`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server error: ${response.status} - ${errorText}`);
        return { success: false, message: errorText };
      }
      const engineResult = await response.json();
      return engineResult;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
