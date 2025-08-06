export interface TSAItem {
  id: string;
  name: string;
  aliases: string[];
  carryOn: 'allowed' | 'prohibited' | 'restricted';
  checkedBag: 'allowed' | 'prohibited' | 'restricted';
  description: string;
  rules?: string;
  category: string;
}

export const tsaItems: TSAItem[] = [
  // Liquids
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    aliases: ['water', 'bottle', 'drink bottle'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Empty water bottles are allowed through security. Filled bottles must comply with 3-1-1 rule.',
    rules: 'Empty bottles allowed. If filled, must be 3.4 oz (100ml) or less and fit in quart-sized bag.',
    category: 'Liquids'
  },
  {
    id: 'shampoo',
    name: 'Shampoo',
    aliases: ['hair products', 'toiletries'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Shampoo in carry-on must follow 3-1-1 liquids rule.',
    rules: 'Containers must be 3.4 oz (100ml) or smaller and fit in quart-sized bag. Larger containers go in checked bags.',
    category: 'Liquids'
  },
  {
    id: 'toothpaste',
    name: 'Toothpaste',
    aliases: ['dental care', 'paste'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Toothpaste is considered a gel and must follow 3-1-1 rule for carry-on.',
    rules: 'Tubes must be 3.4 oz (100ml) or smaller for carry-on. No size restrictions for checked bags.',
    category: 'Liquids'
  },
  {
    id: 'perfume',
    name: 'Perfume',
    aliases: ['cologne', 'fragrance'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Perfume and cologne follow standard liquid restrictions.',
    rules: 'Must be 3.4 oz (100ml) or less per container for carry-on and fit in quart bag.',
    category: 'Liquids'
  },

  // Electronics
  {
    id: 'laptop',
    name: 'Laptop',
    aliases: ['computer', 'notebook', 'macbook'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Laptops are allowed in both carry-on and checked bags.',
    rules: 'Must be removed from bag during screening. Lithium batteries should not be in checked bags if removable.',
    category: 'Electronics'
  },
  {
    id: 'phone',
    name: 'Mobile Phone',
    aliases: ['cell phone', 'smartphone', 'iphone', 'android'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Mobile phones are permitted in carry-on and checked luggage.',
    rules: 'Keep phones easily accessible during security screening. Battery packs should be in carry-on only.',
    category: 'Electronics'
  },
  {
    id: 'power-bank',
    name: 'Power Bank',
    aliases: ['portable charger', 'battery pack', 'external battery'],
    carryOn: 'restricted',
    checkedBag: 'prohibited',
    description: 'Power banks must be in carry-on bags only due to lithium battery regulations.',
    rules: 'Must be under 100Wh. 100-160Wh requires airline approval. Over 160Wh prohibited.',
    category: 'Electronics'
  },
  {
    id: 'camera',
    name: 'Camera',
    aliases: ['dslr', 'digital camera', 'film camera'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Cameras are allowed in both carry-on and checked bags.',
    rules: 'Film cameras with film should go through hand inspection to avoid X-ray damage.',
    category: 'Electronics'
  },

  // Sharp Objects
  {
    id: 'scissors',
    name: 'Scissors',
    aliases: ['cutting tool'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Scissors have blade length restrictions for carry-on.',
    rules: 'Blades must be shorter than 4 inches from pivot point to be allowed in carry-on.',
    category: 'Sharp Objects'
  },
  {
    id: 'knife',
    name: 'Knife',
    aliases: ['blade', 'pocket knife', 'kitchen knife'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Knives are generally prohibited in carry-on luggage.',
    rules: 'All knives prohibited in carry-on except plastic or round-bladed butter knives.',
    category: 'Sharp Objects'
  },
  {
    id: 'razor',
    name: 'Razor',
    aliases: ['shaving razor', 'disposable razor'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Disposable razors and cartridge razors are allowed in carry-on.',
    rules: 'Disposable and cartridge razors allowed. Safety razors without blades allowed. Loose razor blades prohibited.',
    category: 'Sharp Objects'
  },

  // Medications
  {
    id: 'prescription-medication',
    name: 'Prescription Medication',
    aliases: ['medicine', 'pills', 'prescription drugs'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Prescription medications are allowed in carry-on and checked bags.',
    rules: 'Keep in original containers with labels. Liquid medications over 3.4oz require separate screening.',
    category: 'Medical'
  },
  {
    id: 'insulin',
    name: 'Insulin',
    aliases: ['diabetes medication', 'diabetic supplies'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Insulin and diabetes supplies are permitted.',
    rules: 'Unlimited quantities allowed. Keep with syringes/supplies. Declare at checkpoint.',
    category: 'Medical'
  },

  // Tools
  {
    id: 'screwdriver',
    name: 'Screwdriver',
    aliases: ['tool'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Screwdrivers have length restrictions for carry-on.',
    rules: 'Must be shorter than 7 inches to be allowed in carry-on luggage.',
    category: 'Tools'
  },
  {
    id: 'hammer',
    name: 'Hammer',
    aliases: ['tool'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Hammers are prohibited in carry-on luggage.',
    rules: 'All hammers must be packed in checked baggage.',
    category: 'Tools'
  },

  // Food
  {
    id: 'sandwich',
    name: 'Sandwich',
    aliases: ['food', 'solid food'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Solid food items like sandwiches are allowed.',
    rules: 'Solid foods allowed. Spreads, dips, and sauces over 3.4oz must be checked.',
    category: 'Food'
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    aliases: ['spread', 'nut butter'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Peanut butter is considered a liquid/gel for TSA purposes.',
    rules: 'Must be 3.4 oz or smaller containers for carry-on and fit in quart bag.',
    category: 'Food'
  },

  // Sporting Goods
  {
    id: 'baseball-bat',
    name: 'Baseball Bat',
    aliases: ['sports equipment', 'bat'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Baseball bats are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. May require special sporting goods procedures.',
    category: 'Sports'
  },
  {
    id: 'golf-clubs',
    name: 'Golf Clubs',
    aliases: ['golf equipment'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Golf clubs must be checked.',
    rules: 'Pack in hard case or golf bag. Check with airline for fees and restrictions.',
    category: 'Sports'
  },

  // Weapons
  {
    id: 'gun',
    name: 'Firearm',
    aliases: ['gun', 'pistol', 'weapon'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Firearms require special declaration and must be unloaded.',
    rules: 'Must be declared, unloaded, locked in hard case, and ammunition packed separately. Check federal and state laws.',
    category: 'Weapons'
  },

  // Miscellaneous
  {
    id: 'lighter',
    name: 'Lighter',
    aliases: ['cigarette lighter'],
    carryOn: 'restricted',
    checkedBag: 'prohibited',
    description: 'Disposable lighters are allowed in carry-on only.',
    rules: 'One disposable lighter allowed in carry-on. Torch lighters prohibited. No lighters in checked bags.',
    category: 'Miscellaneous'
  },
  {
    id: 'matches',
    name: 'Matches',
    aliases: [],
    carryOn: 'restricted',
    checkedBag: 'prohibited',
    description: 'Safety matches are allowed in carry-on only.',
    rules: 'One book of safety matches allowed in carry-on. Strike-anywhere matches prohibited.',
    category: 'Miscellaneous'
  },
  {
    id: 'umbrella',
    name: 'Umbrella',
    aliases: [],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Umbrellas are generally allowed in both carry-on and checked bags.',
    rules: 'Standard umbrellas allowed. May be subject to additional screening.',
    category: 'Miscellaneous'
  }
];

export const searchItems = (query: string): TSAItem[] => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return tsaItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.aliases.some(alias => alias.toLowerCase().includes(lowercaseQuery)) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 10); // Limit to 10 results
};
export const getItemsByCategory = (category: string): TSAItem[] => {
  if (category === 'all') return tsaItems;
  return tsaItems.filter(item => item.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = [...new Set(tsaItems.map(item => item.category))];
  return categories.sort();
};