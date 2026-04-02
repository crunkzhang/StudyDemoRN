import {tapRushHtml} from '../web/tapRushHtml';

export interface GameDefinition {
  id: string;
  title: string;
  subtitle: string;
  html: string;
}

export const tapRushGame: GameDefinition = {
  id: 'tap-rush',
  title: 'Tap Rush',
  subtitle: '15 秒手速挑战',
  html: tapRushHtml,
};

export const GAMES: GameDefinition[] = [tapRushGame];
