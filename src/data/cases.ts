import type { CaseDefinition } from '@/types'

export const CASES: CaseDefinition[] = [
  {
    id: 'danger-zone',
    name: 'Danger Zone Case',
    cost: 2.49,
    description: 'Tactical military aesthetics. Contains rare knives.',
    accentColor: '#eb4b4b',
    skins: [
      // Mil-Spec (Blue)
      { id: 'ak47-sand-dune', weaponName: 'AK-47', skinName: 'Sand Dune', weaponType: 'Rifle', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'm4a4-urban-ddpat', weaponName: 'M4A4', skinName: 'Urban DDPAT', weaponType: 'Rifle', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'glock18-groundwater', weaponName: 'Glock-18', skinName: 'Groundwater', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.06 },
      { id: 'mp9-sand-scale', weaponName: 'MP9', skinName: 'Sand Scale', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.09 },
      { id: 'tec9-cut-out', weaponName: 'Tec-9', skinName: 'Cut Out', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'nova-wood-fired', weaponName: 'Nova', skinName: 'Wood Fired', weaponType: 'Shotgun', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'p250-verdigris', weaponName: 'P250', skinName: 'Verdigris', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.06 },
      { id: 'ump45-plastique', weaponName: 'UMP-45', skinName: 'Plastique', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'ssg08-arid', weaponName: 'SSG 08', skinName: 'Arid', weaponType: 'Sniper', rarity: 'mil-spec', basePrice: 0.07 },
      // Restricted (Purple)
      { id: 'famas-crypsis', weaponName: 'FAMAS', skinName: 'Crypsis', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.85 },
      { id: 'mp7-akoben', weaponName: 'MP7', skinName: 'Akoben', weaponType: 'SMG', rarity: 'restricted', basePrice: 0.72 },
      { id: 'sg553-aloha', weaponName: 'SG 553', skinName: 'Aloha', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.68 },
      { id: 'deagle-corinthian', weaponName: 'Desert Eagle', skinName: 'Corinthian', weaponType: 'Pistol', rarity: 'restricted', basePrice: 1.20 },
      // Classified (Pink)
      { id: 'usps-flashback', weaponName: 'USP-S', skinName: 'Flashback', weaponType: 'Pistol', rarity: 'classified', basePrice: 4.50 },
      { id: 'm4a1s-decimator', weaponName: 'M4A1-S', skinName: 'Decimator', weaponType: 'Rifle', rarity: 'classified', basePrice: 5.80 },
      // Covert (Red)
      { id: 'ak47-asiimov', weaponName: 'AK-47', skinName: 'Asiimov', weaponType: 'Rifle', rarity: 'covert', basePrice: 45.00 },
      { id: 'awp-neo-noir', weaponName: 'AWP', skinName: 'Neo-Noir', weaponType: 'Sniper', rarity: 'covert', basePrice: 38.00 },
      // Rare Special (Gold)
      { id: 'karambit-ultraviolet', weaponName: 'Karambit', skinName: 'Ultraviolet', weaponType: 'Knife', rarity: 'rare-special', basePrice: 180.00 },
      { id: 'm9-bayonet-safari', weaponName: 'M9 Bayonet', skinName: 'Safari Mesh', weaponType: 'Knife', rarity: 'rare-special', basePrice: 95.00 },
      { id: 'butterfly-stained', weaponName: 'Butterfly Knife', skinName: 'Stained', weaponType: 'Knife', rarity: 'rare-special', basePrice: 220.00 },
    ],
  },
  {
    id: 'prisma',
    name: 'Prisma Case',
    cost: 0.99,
    description: 'Neon prismatic designs with vivid color palettes.',
    accentColor: '#8847ff',
    skins: [
      // Mil-Spec (Blue)
      { id: 'p2000-obsidian', weaponName: 'P2000', skinName: 'Obsidian', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.10 },
      { id: 'mp5sd-phosphor', weaponName: 'MP5-SD', skinName: 'Phosphor', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.09 },
      { id: 'mac10-disco-tech', weaponName: 'MAC-10', skinName: 'Disco Tech', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'ppbizon-embargo', weaponName: 'PP-Bizon', skinName: 'Embargo', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'sawedoff-devourer', weaponName: 'Sawed-Off', skinName: 'Devourer', weaponType: 'Shotgun', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'cz75-poison-dart', weaponName: 'CZ75-Auto', skinName: 'Poison Dart', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.09 },
      { id: 'dual-shred', weaponName: 'Dual Berettas', skinName: 'Shred', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'xm1014-oxide-blaze', weaponName: 'XM1014', skinName: 'Oxide Blaze', weaponType: 'Shotgun', rarity: 'mil-spec', basePrice: 0.09 },
      { id: 'g3sg1-orange-kimono', weaponName: 'G3SG1', skinName: 'Orange Kimono', weaponType: 'Sniper', rarity: 'mil-spec', basePrice: 0.07 },
      // Restricted (Purple)
      { id: 'm4a1s-nightfall', weaponName: 'M4A1-S', skinName: 'Nightfall', weaponType: 'Rifle', rarity: 'restricted', basePrice: 1.40 },
      { id: 'aug-momentum', weaponName: 'AUG', skinName: 'Momentum', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.95 },
      { id: 'p250-vino-primo', weaponName: 'P250', skinName: 'Vino Primo', weaponType: 'Pistol', rarity: 'restricted', basePrice: 0.88 },
      { id: 'glock18-wasteland', weaponName: 'Glock-18', skinName: 'Wasteland Rebel', weaponType: 'Pistol', rarity: 'restricted', basePrice: 0.92 },
      // Classified (Pink)
      { id: 'awp-atheris', weaponName: 'AWP', skinName: 'Atheris', weaponType: 'Sniper', rarity: 'classified', basePrice: 6.20 },
      { id: 'ak47-uncharted', weaponName: 'AK-47', skinName: 'Uncharted', weaponType: 'Rifle', rarity: 'classified', basePrice: 7.80 },
      // Covert (Red)
      { id: 'usps-monster-mashup', weaponName: 'USP-S', skinName: 'Monster Mashup', weaponType: 'Pistol', rarity: 'covert', basePrice: 28.00 },
      { id: 'm4a4-emperor', weaponName: 'M4A4', skinName: 'The Emperor', weaponType: 'Rifle', rarity: 'covert', basePrice: 32.00 },
      // Rare Special (Gold)
      { id: 'stiletto-forest', weaponName: 'Stiletto Knife', skinName: 'Forest DDPAT', weaponType: 'Knife', rarity: 'rare-special', basePrice: 88.00 },
      { id: 'talon-fade', weaponName: 'Talon Knife', skinName: 'Fade', weaponType: 'Knife', rarity: 'rare-special', basePrice: 340.00 },
      { id: 'navaja-marble-fade', weaponName: 'Navaja Knife', skinName: 'Marble Fade', weaponType: 'Knife', rarity: 'rare-special', basePrice: 110.00 },
    ],
  },
  {
    id: 'clutch',
    name: 'Clutch Case',
    cost: 0.64,
    description: 'Precision engineering meets mechanical beauty.',
    accentColor: '#4b69ff',
    skins: [
      // Mil-Spec (Blue)
      { id: 'p90-freight', weaponName: 'P90', skinName: 'Freight', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'fiveseven-kami', weaponName: 'Five-SeveN', skinName: 'Kami', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.09 },
      { id: 'negev-mjolnir', weaponName: 'Negev', skinName: 'Mjolnir', weaponType: 'Rifle', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'tec9-bamboozle', weaponName: 'Tec-9', skinName: 'Bamboozle', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'm249-spectre', weaponName: 'M249', skinName: 'Spectre', weaponType: 'Rifle', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'mag7-cinquedea', weaponName: 'MAG-7', skinName: 'Cinquedea', weaponType: 'Shotgun', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'r8-grip', weaponName: 'R8 Revolver', skinName: 'Grip', weaponType: 'Pistol', rarity: 'mil-spec', basePrice: 0.07 },
      { id: 'nova-gila', weaponName: 'Nova', skinName: 'Gila', weaponType: 'Shotgun', rarity: 'mil-spec', basePrice: 0.08 },
      { id: 'mp9-bulldozer', weaponName: 'MP9', skinName: 'Bulldozer', weaponType: 'SMG', rarity: 'mil-spec', basePrice: 0.07 },
      // Restricted (Purple)
      { id: 'ak47-phantom', weaponName: 'AK-47', skinName: 'Phantom Disruptor', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.78 },
      { id: 'mp7-powercore', weaponName: 'MP7', skinName: 'Powercore', weaponType: 'SMG', rarity: 'restricted', basePrice: 0.65 },
      { id: 'famas-eye-athena', weaponName: 'FAMAS', skinName: 'Eye of Athena', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.82 },
      { id: 'sg553-griffin', weaponName: 'SG 553', skinName: 'Griffin', weaponType: 'Rifle', rarity: 'restricted', basePrice: 0.70 },
      // Classified (Pink)
      { id: 'awp-mortis', weaponName: 'AWP', skinName: 'Mortis', weaponType: 'Sniper', rarity: 'classified', basePrice: 5.40 },
      { id: 'm4a4-neo-noir', weaponName: 'M4A4', skinName: 'Neo-Noir', weaponType: 'Rifle', rarity: 'classified', basePrice: 6.90 },
      // Covert (Red)
      { id: 'ak47-bloodsport', weaponName: 'AK-47', skinName: 'Bloodsport', weaponType: 'Rifle', rarity: 'covert', basePrice: 52.00 },
      { id: 'deagle-light-rail', weaponName: 'Desert Eagle', skinName: 'Light Rail', weaponType: 'Pistol', rarity: 'covert', basePrice: 18.00 },
      // Rare Special (Gold)
      { id: 'gut-knife-doppler', weaponName: 'Gut Knife', skinName: 'Doppler', weaponType: 'Knife', rarity: 'rare-special', basePrice: 75.00 },
      { id: 'flip-knife-tiger', weaponName: 'Flip Knife', skinName: 'Tiger Tooth', weaponType: 'Knife', rarity: 'rare-special', basePrice: 165.00 },
      { id: 'hand-wraps-duct', weaponName: 'Hand Wraps', skinName: 'Duct Tape', weaponType: 'Gloves', rarity: 'rare-special', basePrice: 280.00 },
    ],
  },
]

export const getCaseById = (id: string): CaseDefinition | undefined =>
  CASES.find((c) => c.id === id)
