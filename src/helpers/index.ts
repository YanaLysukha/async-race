import { carBrands, carModels } from '../data';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomCarName = () => {
  const carBrand = carBrands[getRandomNumber(0, carBrands.length)];
  const carModel = carModels[getRandomNumber(0, carModels.length)];
  return `${carBrand} ${carModel}`;
};

export const getRandomCarColor = () => {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hex.padStart(6, '0')}`;
};
