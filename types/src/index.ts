export interface ServerToClientEvents {
  update_game_state: (state: GameState) => void;
}

export interface ClientToServerEvents {
  set_position: (x: number, y: number) => void;
  player_hit: (x: number, y: number) => void;
  set_weapon: (id: number) => void;
  set_username: (username: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export enum EnemyTypes {
  AngryPig,
  Bat,
  Bee,
  BlueBird,
  Bunny,
  Chameleon,
  Chicken,
  Duck,
  FatBird,
  Ghost,
  Mushroom,
  Plant,
  Radish,
  Rino,
  Rock,
  Skull,
  Slime,
  Snail,
  Trunk,
  Turtle,
}

export type Enemies = keyof typeof EnemyTypes;

export interface User {
  id: string;
  score: number;
  swiping: boolean;
  weapon: number;
  username?: string;
  x?: number;
  y?: number;
}

export interface Enemy {
  id: string;
  modified: number;
  type: Enemies;
  dead: boolean;
  points: number;
  x: number /* x coordinate at the start of the current move */;
  y: number /* y coordinate at the start of the current move */;
  vx: number /* velocity in the x direction per ms */;
  vy: number /* velocity in the y direction per ms */;
}

export interface GameState {
  users: User[];
  enemies: Enemy[];
}
