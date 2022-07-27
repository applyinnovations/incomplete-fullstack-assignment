import React from "react";
import { Enemies } from "@apply/types";

type EnemyState = "Move" | "Hit";

interface EnemyData {
  width: number;
  height: number;
  Move: number;
  Hit: number;
}

interface EnemyProps {
  enemy: Enemies;
  state?: EnemyState;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy, state = "Move" }) => {
  const e = enemies[enemy];
  if (!e) return <></>;
  const imgPath = `/assets/Enemies/${enemy}/${state} (${e.width}x${e.height}).png`;
  return (
    <div
      className="enemy"
      style={{
        width: e.width,
        height: e.height,
        backgroundImage: `url('${imgPath}')`,
        animation: `enemy .4s steps(${e[state]}) infinite`,
      }}
    />
  );
};

const enemies: { [key in Enemies]: EnemyData } = {
  AngryPig: {
    width: 36,
    height: 30,
    Move: 11,
    Hit: 4,
  },
  Bat: {
    width: 46,
    height: 30,
    Move: 6,
    Hit: 4,
  },
  Bee: {
    width: 36,
    height: 34,
    Move: 5,
    Hit: 4,
  },
  BlueBird: {
    width: 32,
    height: 32,
    Move: 8,
    Hit: 4,
  },
  Bunny: {
    width: 34,
    height: 44,
    Move: 11,
    Hit: 4,
  },
  Chameleon: {
    width: 84,
    height: 38,
    Move: 7,
    Hit: 4,
  },
  Chicken: {
    width: 32,
    height: 34,
    Move: 13,
    Hit: 4,
  },
  Duck: {
    width: 36,
    height: 36,
    Move: 9,
    Hit: 4,
  },
  FatBird: {
    width: 40,
    height: 48,
    Move: 7,
    Hit: 4,
  },
  Ghost: {
    width: 44,
    height: 30,
    Move: 9,
    Hit: 4,
  },
  Mushroom: {
    width: 32,
    height: 32,
    Move: 15,
    Hit: 4,
  },
  Plant: {
    width: 44,
    height: 42,
    Move: 10,
    Hit: 4,
  },
  Radish: {
    width: 30,
    height: 38,
    Move: 11,
    Hit: 4,
  },
  Rino: {
    width: 52,
    height: 34,
    Move: 5,
    Hit: 4,
  },
  Rock: {
    width: 38,
    height: 34,
    Move: 13,
    Hit: 4,
  },
  Skull: {
    width: 52,
    height: 54,
    Move: 7,
    Hit: 4,
  },
  Slime: {
    width: 44,
    height: 30,
    Move: 9,
    Hit: 4,
  },
  Snail: {
    width: 38,
    height: 24,
    Move: 9,
    Hit: 4,
  },
  Trunk: {
    width: 64,
    height: 32,
    Move: 13,
    Hit: 4,
  },
  Turtle: {
    width: 44,
    height: 26,
    Move: 13,
    Hit: 4,
  },
};
