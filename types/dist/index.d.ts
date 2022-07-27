export interface ServerToClientEvents {
    update_game_state: (state: GameState) => void;
}
export interface ClientToServerEvents {
    set_position: (x: number, y: number) => void;
    player_hit: (x: number, y: number) => void;
    set_weapon: (id: number) => void;
    set_username: (username: string) => void;
}
export interface InterServerEvents {
}
export interface SocketData {
}
export declare enum EnemyTypes {
    AngryPig = 0,
    Bat = 1,
    Bee = 2,
    BlueBird = 3,
    Bunny = 4,
    Chameleon = 5,
    Chicken = 6,
    Duck = 7,
    FatBird = 8,
    Ghost = 9,
    Mushroom = 10,
    Plant = 11,
    Radish = 12,
    Rino = 13,
    Rock = 14,
    Skull = 15,
    Slime = 16,
    Snail = 17,
    Trunk = 18,
    Turtle = 19
}
export declare type Enemies = keyof typeof EnemyTypes;
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
    x: number;
    y: number;
    vx: number;
    vy: number;
}
export interface GameState {
    users: User[];
    enemies: Enemy[];
}
//# sourceMappingURL=index.d.ts.map