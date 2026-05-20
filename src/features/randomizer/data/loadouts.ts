import type { BuildPlan, Challenge, RunePage, SummonerSpell } from "@/shared/types/randomizer";

export const builds: BuildPlan[] = [
  { id: "standard-carry", name: "Meta Carry", style: "DPS fiable con spike de dos objetos", risk: "Balanced", items: ["Core mítico actual", "Botas óptimas", "Objeto de daño", "Defensivo situacional"] },
  { id: "glass-cannon", name: "Glass Cannon", style: "Máximo daño, cero respeto por la muerte", risk: "Sweaty", items: ["Daño puro", "Penetración", "Crítico/AP", "Elixir temprano"] },
  { id: "tank-fraud", name: "Tank Fraud", style: "Campeón raro convertido en frontline", risk: "Troll", items: ["Vida", "Resistencias mixtas", "Slow/utility", "Warmog si encaja"] },
  { id: "movement-cult", name: "Speed Cult", style: "Jugar a esquivar como si fuera un rhythm game", risk: "Creator", items: ["Botas rápidas", "Velocidad de movimiento", "Activa de engage", "Objeto sorpresa"] },
  { id: "anti-carry", name: "Anti-Carry Protocol", style: "Todo para inutilizar al mejor enemigo", risk: "Sweaty", items: ["Anathema/antiheal", "Resistencia clave", "Control", "Cooldown reduction"] },
  { id: "support-economy", name: "Economía de Support", style: "Build barata y cruel para molestar", risk: "Troll", items: ["Item de support", "Vision", "Utility", "Redemption vibes"] },
  { id: "one-shot", name: "One-Shot Cinema", style: "Vivir para borrar una barra de vida", risk: "Creator", items: ["Burst", "Penetración", "Cooldown", "Zhonya/GA si procede"] },
  { id: "bruiser-royalty", name: "Bruiser Royalty", style: "Daño sostenido con aguante real", risk: "Balanced", items: ["HP + daño", "Haste", "Resistencia situacional", "Sterak-like"] }
];

export const runePages: RunePage[] = [
  { primary: "Precisión", keystone: "Conquistador", secondary: "Valor", shards: ["Velocidad", "Adaptativo", "Vida escalada"] },
  { primary: "Dominación", keystone: "Electrocutar", secondary: "Brujería", shards: ["Haste", "Adaptativo", "Tenacidad"] },
  { primary: "Brujería", keystone: "Cometa Arcano", secondary: "Inspiración", shards: ["Haste", "Adaptativo", "Vida"] },
  { primary: "Valor", keystone: "Reverberacción", secondary: "Precisión", shards: ["Haste", "Armadura", "Vida"] },
  { primary: "Inspiración", keystone: "Primer Golpe", secondary: "Dominación", shards: ["Adaptativo", "Adaptativo", "Vida"] },
  { primary: "Precisión", keystone: "Ataque Intensificado", secondary: "Inspiración", shards: ["Velocidad", "Adaptativo", "Armadura"] }
];

export const summonerSpells: SummonerSpell[] = [
  { name: "Flash", intent: "seguridad universal" },
  { name: "Ignite", intent: "kill pressure y ego" },
  { name: "Teleport", intent: "mapa, tempo y macro" },
  { name: "Ghost", intent: "persecución y teamfights largas" },
  { name: "Exhaust", intent: "apagar carries enemigos" },
  { name: "Cleanse", intent: "sobrevivir al CC decisivo" },
  { name: "Smite", intent: "jungla o caos absoluto" },
  { name: "Barrier", intent: "bait y duelos cerrados" },
  { name: "Heal", intent: "2v2 y velocidad clutch" }
];

export const challenges: Challenge[] = [
  { id: "minute-five", title: "Silencio hasta minuto 5", description: "Solo puedes usar habilidades después del minuto 5. Antes de eso, last hit y fe.", difficulty: "Troll", tags: ["laning", "restriction"] },
  { id: "no-boots", title: "Sin botas", description: "No puedes comprar botas durante toda la partida. La velocidad está sobrevalorada.", difficulty: "Troll", tags: ["items"] },
  { id: "ult-gank", title: "Ultimate = gank", description: "Cada vez que tengas ultimate disponible debes forzar una jugada en menos de 45 segundos.", difficulty: "Sweaty", tags: ["tempo", "macro"] },
  { id: "basic-only", title: "Ataques básicos", description: "Solo puedes matar campeones enemigos con básicos. Las habilidades pueden preparar, no ejecutar.", difficulty: "Troll", tags: ["combat"] },
  { id: "river-king", title: "Rey del río", description: "Debes pelear o colocar visión en río antes de cada objetivo neutral.", difficulty: "Balanced", tags: ["vision", "objectives"] },
  { id: "no-recall", title: "Recall de lujo", description: "Solo puedes volver a base después de una kill, asistencia, placa, torre u objetivo.", difficulty: "Creator", tags: ["economy"] },
  { id: "pink-tax", title: "Impuesto rosa", description: "Compra un ward de control cada vez que mueras. Si no puedes, tu siguiente compra debe incluirlo.", difficulty: "Balanced", tags: ["vision"] },
  { id: "first-item-chaos", title: "Primer objeto invertido", description: "Tu primer item completo debe ser defensivo si eres carry, o de daño si eres tanque/support.", difficulty: "Troll", tags: ["items"] },
  { id: "shotcaller", title: "Shotcaller obligatorio", description: "Antes de cada dragón o Heraldo debes pingear una decisión clara y comprometerte.", difficulty: "Sweaty", tags: ["team"] },
  { id: "skin-lore", title: "Lore accurate", description: "Juega como si tu campeón odiara a una región enemiga: prioriza esos duelos cuando aparezcan.", difficulty: "Creator", tags: ["roleplay"] }
];

export const restrictions = [
  "No puedes comprar el mismo tipo de resistencia dos veces seguidas.",
  "Tu primera kill debe ocurrir fuera de tu línea.",
  "Debes usar cada arbusto cercano antes de tradear.",
  "No puedes pingear ayuda; solo puedes pingear intención.",
  "Cada objetivo neutral exige una frase de guerra en chat del grupo.",
  "Si fallas una ultimate, debes jugar defensivo durante 60 segundos.",
  "Debes cambiar tu trinket al minuto 9.",
  "No puedes perseguir más allá de dos pantallas sin visión.",
  "Cada back debe comprar al menos un componente útil, nada de compras de pánico.",
  "Si ganas una teamfight, tienes que convertirla en objetivo o visión profunda."
];
