import { champions } from "@/features/randomizer/data/champions";
import { builds, challenges, restrictions, runePages, summonerSpells } from "@/features/randomizer/data/loadouts";
import { makeId, pickMany, pickOne } from "@/shared/lib/random";
import type { RandomMode, RandomResult, Role } from "@/shared/types/randomizer";

const roles: Role[] = ["Top", "Jungle", "Mid", "Bot", "Support"];

const twoSpells = (mode: RandomMode) => {
  if (mode === "aram") {
    return [pickOne(summonerSpells.filter((spell) => spell.name !== "Smite")), pickOne(summonerSpells.filter((spell) => spell.name !== "Smite"))];
  }

  const first = pickOne(summonerSpells);
  const secondPool = summonerSpells.filter((spell) => spell.name !== first.name);
  return [first, pickOne(secondPool)];
};

const championForRole = (role: Role) => {
  const rolePool = champions.filter((champion) => champion.roles.includes(role));
  return pickOne(rolePool.length ? rolePool : champions);
};

export const createRandomResult = (mode: RandomMode): RandomResult => {
  const role = mode === "aram" ? "Fill" : pickOne(roles);
  const champion = championForRole(role === "Fill" ? pickOne(roles) : role);
  const base = {
    id: makeId(),
    mode,
    createdAt: Date.now(),
    shareCode: "",
    restrictions: pickMany(restrictions, mode === "bravery" || mode === "full" ? 3 : 1)
  } satisfies Omit<RandomResult, "shareCode">;

  if (mode === "team" || mode === "draft") {
    const team = roles.map((teamRole) => ({
      role: teamRole,
      champion: championForRole(teamRole),
      build: pickOne(builds),
      challenge: pickOne(challenges)
    }));

    const result: RandomResult = {
      ...base,
      role,
      team,
      champion: team[0]?.champion,
      build: team[0]?.build,
      runes: pickOne(runePages),
      spells: twoSpells(mode),
      challenge: pickOne(challenges)
    };
    return { ...result, shareCode: encodeShareCode(result) };
  }

  const result: RandomResult = {
    ...base,
    champion,
    role: mode === "champion" ? undefined : role,
    build: mode === "champion" || mode === "role" ? undefined : pickOne(builds),
    runes: mode === "champion" || mode === "role" ? undefined : pickOne(runePages),
    spells: mode === "champion" ? undefined : twoSpells(mode),
    challenge: mode === "full" || mode === "bravery" || mode === "aram" ? pickOne(challenges) : undefined
  };

  return { ...result, shareCode: encodeShareCode(result) };
};

export const encodeShareCode = (result: Omit<RandomResult, "shareCode"> | RandomResult) => {
  const payload = [result.mode, result.champion?.id ?? "team", result.role ?? "fill", result.build?.id ?? "core", result.challenge?.id ?? "clean"].join(":");
  const encoded = typeof window === "undefined" ? payload : window.btoa(payload);
  return encoded.replace(/[^A-Z0-9]/gi, "").slice(0, 18).toUpperCase();
};
