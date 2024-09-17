export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type CarData = {
  name: string;
  color: string;
};

export type IEngine = {
  velocity: number;
  distance: number;
};
