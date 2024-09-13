import { CarData, ICar } from '../types';

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

  static async getCar(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}/${id}`;
    try {
      const response = await fetch(url);
      const car: ICar = await response.json();
      return car;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async createCar(carData: CarData) {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      const createdCar = await response.json();
      return createdCar;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async deleteCar(id: number) {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      const deletedCar = await response.json();
      return deletedCar;
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  static async updateCar(carData: ICar) {
    const url = `${UrlPath.BASE}/${UrlPath.GARAGE}/${carData.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      const updatedCar = await response.json();
      return updatedCar;
    } catch (error) {
      throw Error(`${error}`);
    }
  }
}
