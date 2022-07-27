import React from "react";

export const columns = [];
interface WeaponProps {
  id: number;
  scale?: number;
  swipe?: boolean;
  onClick?: () => void;
}

export const Weapon: React.FC<WeaponProps> = ({
  scale = 1,
  swipe,
  id,
  onClick = () => null,
}) => {
  const r = 28 - Math.max(0, Math.min(28, Math.floor(id / 14)));
  const c = 28 - Math.max(0, Math.min(14, id % 14));
  return (
    <div
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <div
        onClick={onClick}
        className={`${"weapon"} ${swipe ? "weapon-swipe" : ""}`}
        style={{
          backgroundImage: `url("/assets/Weapons/DarkOutline (64x64).png")`,
          backgroundPosition: `${c * 64}px ${r * 64}px`,
        }}
      />
    </div>
  );
};
