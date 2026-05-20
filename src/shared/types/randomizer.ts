export type Role = "Top" | "Jungle" | "Mid" | "Bot" | "Support" | "Fill";

export type RandomMode =
  | "champion"
  | "role"
  | "build"
  | "full"
  | "team"
  | "draft"
  | "aram"
  | "bravery";

export type Difficulty = "Troll" | "Balanced" | "Sweaty" | "Creator";

export interface Champion {
  id: string;
  name: string;
  title: string;
  roles: Role[];
  region: string;
  fantasy: string;
}

export interface BuildPlan {
  id: string;
  name: string;
  style: string;
  items: string[];
  risk: Difficulty;
}

export interface RunePage {
  primary: string;
  keystone: string;
  secondary: string;
  shards: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface SummonerSpell {
  name: string;
  intent: string;
}

export interface RandomResult {
  id: string;
  mode: RandomMode;
  createdAt: number;
  champion?: Champion;
  role?: Role;
  build?: BuildPlan;
  runes?: RunePage;
  spells?: SummonerSpell[];
  challenge?: Challenge;
  team?: Array<{
    champion: Champion;
    role: Role;
    build: BuildPlan;
    challenge: Challenge;
  }>;
  restrictions: string[];
  shareCode: string;
}

export interface RandomizerSettings {
  sound: boolean;
  streamerMode: boolean;
  theme: "piltover" | "noxus" | "ionia" | "shadow-isles";
  avoidFavorites: boolean;
}
