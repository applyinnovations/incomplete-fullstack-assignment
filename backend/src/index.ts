import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  User,
  Enemy,
  Enemies,
} from "@apply/types";
import { v4 } from "uuid";
import { performance } from "perf_hooks";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({
  cors: {
    origin: "*",
  },
});

const randomChoice: <K>(arr: K[]) => K = (arr) => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const enemyWeights: { [key in Enemies]: number } = {
  AngryPig: 1,
  Bat: 2,
  Bee: 3,
  BlueBird: 4,
  Bunny: 5,
  Chameleon: 6,
  Chicken: 7,
  Duck: 8,
  FatBird: 9,
  Ghost: 10,
  Mushroom: 11,
  Plant: 12,
  Radish: 13,
  Rino: 14,
  Rock: 15,
  Skull: 16,
  Slime: 17,
  Snail: 18,
  Trunk: 19,
  Turtle: 20,
};

const enemyTypes = Object.keys(enemyWeights) as Enemies[];

const port = parseInt(process.env.PORT || "3001") as number;
io.listen(port);

const state: {
  users: { [key: string]: User };
  enemies: { [key: string]: Enemy };
} = {
  users: {},
  enemies: {},
};

const broadcast_game_state = () => {
  io.emit("update_game_state", {
    users: Object.values(state.users),
    enemies: Object.values(state.enemies),
  });
};

const hit = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dist = Math.sqrt(dx ** 2 + dy ** 2);
  return dist < 0.02;
};

const remove_enemy = (id: string) => {
  delete state.enemies[id];
  broadcast_game_state();
  spawn_enemy();
};

const kill_enemy = (id: string) => {
  state.enemies[id].dead = true;
  setTimeout(() => remove_enemy(id), 400);
  broadcast_game_state();
};

const spawn_enemy = () => {
  const id = v4();
  const type = randomChoice(enemyTypes);
  const points = enemyWeights[type];
  const v = () => (1 - 2 * Math.random()) * 10e-8 * (points + 1000);
  state.enemies[id] = {
    id,
    type,
    dead: false,
    points,
    modified: performance.now(),
    x: Math.random(),
    y: Math.random(),
    vx: v(), // velocity in decimal of screen per ms
    vy: v(), // velocity in decimal of screen per ms
  };
  const ms = 500;
  const int = setInterval(() => {
    // velocity changes each interval
    let e = state.enemies[id];
    if (e) {
      const x = e.x + ms * e.vx;
      const y = e.y + ms * e.vy;
      if (0 < x && x < 1 && 0 < y && y < 1) {
        e = { ...e, x, y, vx: v(), vy: v(), modified: performance.now() };
        state.enemies[id] = e;
        broadcast_game_state();
      } else {
        clearInterval(int);
        remove_enemy(id);
      }
    }
  }, ms);
  broadcast_game_state();
};

setInterval(() => {
  const enemy_cap = Object.keys(state.users).length * 3;
  const enemy_count = Object.keys(state.enemies).length;
  if (enemy_count < enemy_cap) {
    spawn_enemy();
  }
}, 5000);

io.on("connection", (socket) => {
  /* socket.emit sends to client */
  /* socket.on receives from client */
  console.log(`${socket.id} connected`);

  socket.on("player_hit", (x, y) => {
    const event_time = performance.now();
    state.users[socket.id].swiping = true;
    for (const e of Object.values(state.enemies)) {
      const ex = (event_time - e.modified) * e.vx + e.x;
      const ey = (event_time - e.modified) * e.vy + e.y;
      if (hit(x, y, ex, ey)) {
        kill_enemy(e.id);
        state.users[socket.id].score += e.points;
      }
    }
    setTimeout(() => {
      state.users[socket.id].swiping = false;
      broadcast_game_state();
    }, 200);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
