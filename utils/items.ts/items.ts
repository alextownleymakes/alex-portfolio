type GalacticRaces = 'human' | 'elf' | 'dwarf' | 'orc' | 'goblin' | 'troll' | 'ogre' | 'gnome' | 'halfling' | 'kobold' | 'lizardfolk' | 'dragonborn' | 'tiefling' | 'aasimar' | 'genasi' | 'firbolg' | 'goliath' | 'kenku' | 'tabaxi' | 'aarakocra' | 'grung' | 'yuan-ti' | 'triton' | 'merfolk' | 'sahuagin' | 'kuo-toa' | 'mindflayer' | 'beholder' | 'illithid' | 'gith' | 'modron' | 'thri-kreen' | 'flumph' | 'goblinoid' | 'monstrous' | 'undead' | 'construct' | 'elemental' | 'celestial' | 'fiend' | 'aberration' | 'beast' | 'dragon' | 'fey' | 'giant' | 'humanoid' | 'ooze' | 'plant' | 'vermin' | 'outsider';

export type ItemTypes = 'misc' | 'ship' | 'weapon' | 'armor' | 'consumable' | 'key' | 'quest' | 'currency' | 'material' | 'tool' | 'container' | 'furniture' | 'food' | 'drink' | 'clothing' | 'jewelry' | 'gem' | 'artifact' | 'book' | 'scroll' | 'potion' | 'poison' | 'trap' | 'explosive' | 'ammo' | 'spell' | 'skill' | 'ability' | 'class' | 'mineral' | 'resource'

interface ItemType {
    id: number;
    name: string;
    description: string;
    value: number;
    weight: number;
    type: ItemTypes;
    rarity: string;
    image: string;
}

type ShipTypes = 'shuttle' | 'fighter' | 'bomber' | 'frigate' | 'cruiser' | 'destroyer' | 'battleship' | 'carrier' | 'dreadnought' | 'starfighter' | 'starbomber' | 'starfrigate' | 'stardestroyer' | 'starbattleship' | 'starcarrier' | 'stardreadnought' | 'pod' | 'transport' | 'freighter' | 'corvette' | 'gunship';

interface ShipType extends ItemType {
    special: {
        type: ShipTypes;
        speed: number;
        armor: number;
        shield: number;
        capacity: number;
        weapons: ShipWeaponType[];
        armorTypes: ShipArmorType[];
    }
}

type ShipWeaponTypes = 'energy' | 'projectile' | 'explosive' | 'missile' | 'bullet' | 'laser' | 'plasma' | 'ion' | 'railgun' | 'cannon' | 'beam' | 'pulse' | 'flak' | 'torpedo' | 'rocket' | 'grenade' | 'mine' | 'turret' | 'drone' | 'fighter' | 'bomber' | 'frigate' | 'cruiser' | 'destroyer' | 'battleship' | 'carrier' | 'dreadnought' | 'starfighter' | 'starbomber' | 'starfrigate' | 'stardestroyer' | 'starbattleship' | 'starcarrier' | 'stardreadnought'

interface ShipWeaponType extends ItemType {
    damage: number;
    range: number;
    attackSpeed: number;
    hands: number;
    ammo: number;
}

type ShipArmorTypes = 'light' | 'medium' | 'heavy' | 'shield' | 'hull' | 'titanium' | 'adamantium' | 'carbon' | 'ceramic' | 'composite' | 'nanoweave' | 'plasteel' | 'tungsten' | 'uranium' | 'zirconium' | 'alloy' | 'aluminum' | 'bronze' | 'copper' | 'gold' | 'iron' | 'lead' | 'silver' | 'steel' | 'adamantium' | 'carbon' | 'ceramic' | 'composite' | 'nanoweave' | 'energy' | 'plasma' | 'ion';

interface ShipArmorType extends ItemType {
    special: {
        defense: number;
        shield: number;
        durability: number;
        type: ShipArmorTypes;
    }
}

type ConsumableEffects = 'heal' | 'buff' | 'debuff' | 'poison' | 'trap' | 'explosive' | 'ammo' | 'spell' | 'skill' | 'ability'

interface ConsumableType extends ItemType {
    special: {
        effect: ConsumableEffects;
        duration: number;
        target: string;
        type: ConsumableEffects;
    }
}

type MiscTypes = 'misc' | 'currency' | 'documents' | 'material' | 'tool' | 'container' | 'furniture' | 'food' | 'drink' | 'clothing' | 'jewelry' | 'gem' | 'artifact' | 'book' | 'scroll' | 'potion' | 'poison' | 'trap' | 'explosive' | 'ammo' | 'spell' | 'skill' | 'ability' | 'class' | 'mineral' | 'resource';

interface MiscType extends ItemType {
    special: {
        type: MiscTypes;
    }
}

type CurrencyTypes = 'coin' | 'gem' | 'jewel' | 'credit' | 'dollar' | 'euro' | 'yen' | 'pound' | 'rupee' | 'gold' | 'silver' | 'copper' | 'platinum' | 'titanium' | 'adamantium' | 'carbon' | 'ceramic' | 'composite' | 'nanoweave' | 'plasteel' | 'tungsten' | 'uranium' | 'zirconium' | 'alloy' | 'aluminum' | 'bronze' | 'copper' | 'gold' | 'iron' | 'lead' | 'silver' | 'steel' | 'adamantium' | 'carbon' | 'ceramic' | 'composite' | 'energy' | 'plasma' | 'ion';

interface CurrencyType extends ItemType {
    special: {
        type: CurrencyTypes;
        race: GalacticRaces;
    }
}

type MaterialTypes = 'metal' | 'wood' | 'stone' | 'glass' | 'crystal' | 'plastic' | 'rubber' | 'leather' | 'cloth' | 'paper' | 'bone' | 'shell' | 'feather' | 'silk' | 'fur' | 'scale' | 'hide' | 'pelt' | 'scales' | 'hides' | 'pelts' | 'fabric' | 'thread' | 'yarn' | 'rope' | 'cord' | 'string' | 'wire' | 'cable' | 'chain' | 'plate' | 'bar' | 'ingot' | 'ore' | 'gem' | 'jewel' | 'crystal' | 'rock' | 'mineral' | 'metallic' | 'non-metallic' | 'precious' | 'semi-precious' | 'common' | 'rare' | 'scarce' | 'exotic' | 'alien' | 'magical' | 'enchanted' | 'mystical' | 'arcane' | 'divine' | 'celestial' | 'infernal' | 'elemental' | 'earth' | 'air' | 'fire' | 'water' | 'ice' | 'lightning' | 'acid' | 'poison' | 'radiation' | 'toxic' | 'biohazard' | 'nuclear' | 'chemical' | 'explosive' | 'volatile' | 'flammable' | 'corrosive' | 'caustic';

interface MaterialType extends ItemType {
    special: {
        type: MaterialTypes
    }
}



type MissionTypes = 'delivery' | 'escort' | 'bounty' | 'assassination' | 'retrieval' | 'rescue' | 'sabotage' | 'infiltration' | 'espionage' | 'heist' | 'smuggling' | 'piracy' | 'blockade' | 'patrol' | 'scout' | 'survey' | 'exploration' | 'colonization' | 'terraforming' | 'mining' | 'harvesting' | 'farming' | 'hunting' | 'fishing' | 'trapping' | 'logging' | 'quarrying' | 'excavation' | 'archaeology' | 'research' | 'diplomacy' | 'negotiation' | 'trade' | 'commerce' | 'economics' | 'politics' | 'law' | 'justice' | 'security' | 'military' | 'intelligence' | 'counterintelligence' | 'surveillance' | 'interrogation' | 'torture' | 'execution' | 'imprisonment' | 'rehabilitation' | 'reeducation' | 'entertainment' | 'recreation' | 'sports' | 'games' | 'gambling' | 'theater' | 'music' | 'dance' | 'art' | 'literature' | 'poetry' | 'film' | 'television' | 'radio' | 'internet' | 'social' | 'media' | 'journalism' | 'propaganda' | 'advertising' | 'marketing' | 'public' | 'relations' | 'education' | 'training' | 'coaching' | 'mentoring' | 'tutoring' | 'teaching' | 'instruction' | 'learning' | 'knowledge' | 'wisdom' | 'philosophy' | 'theology' | 'religion' | 'spirituality' | 'mythology' | 'occult' | 'magic' | 'sorcery' | 'witchcraft' | 'alchemy' | 'astrology' | 'divination' | 'psychic' | 'paranormal' | 'supernatural' | 'fantasy' | 'science' | 'technology' | 'engineering' | 'mathematics' | 'physics' | 'chemistry';

interface MissionType extends ItemType {
    special: {
        type: MiscTypes | ConsumableEffects | ShipTypes | ShipWeaponTypes | ShipArmorTypes | CurrencyTypes | MaterialTypes;
        completed: boolean;
    }
}

interface KeyType extends ItemType {
    lock: number;
}

const resume: ItemType = {
    id: 0,
    name: 'Resume',
    description: 'Alex\'s resume',
    value: 1000,
    weight: 0,
    type: 'quest',
    rarity: 'scarce',
    image: '',
}

const quest: ItemType[] = [
    resume,
]
