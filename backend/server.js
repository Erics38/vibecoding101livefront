const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// TSA Items Database (Complete with top 10 per category)
const tsaItems = [
  // Liquids - Top 10
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
  {
    id: 'contact-solution',
    name: 'Contact Lens Solution',
    aliases: ['contact solution', 'eye drops'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Contact lens solution must follow 3-1-1 rule.',
    rules: 'Must be 3.4 oz (100ml) or less for carry-on. Larger containers in checked bags.',
    category: 'Liquids'
  },
  {
    id: 'hand-sanitizer',
    name: 'Hand Sanitizer',
    aliases: ['sanitizer', 'hand gel'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Hand sanitizer follows standard liquid restrictions.',
    rules: 'Must be 3.4 oz (100ml) or less for carry-on and fit in quart bag.',
    category: 'Liquids'
  },
  {
    id: 'sunscreen',
    name: 'Sunscreen',
    aliases: ['sunscreen lotion', 'spf'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Sunscreen is considered a liquid/gel.',
    rules: 'Must be 3.4 oz (100ml) or less for carry-on and fit in quart bag.',
    category: 'Liquids'
  },
  {
    id: 'deodorant',
    name: 'Deodorant',
    aliases: ['antiperspirant'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Deodorant follows liquid restrictions if gel or liquid.',
    rules: 'Gel/liquid deodorant must be 3.4 oz (100ml) or less for carry-on. Solid deodorant has no restrictions.',
    category: 'Liquids'
  },
  {
    id: 'mouthwash',
    name: 'Mouthwash',
    aliases: ['dental rinse'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Mouthwash is considered a liquid.',
    rules: 'Must be 3.4 oz (100ml) or less for carry-on and fit in quart bag.',
    category: 'Liquids'
  },
  {
    id: 'nail-polish',
    name: 'Nail Polish',
    aliases: ['nail polish remover'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Nail polish and remover follow liquid restrictions.',
    rules: 'Must be 3.4 oz (100ml) or less for carry-on and fit in quart bag.',
    category: 'Liquids'
  },

  // Electronics - Top 10
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
  {
    id: 'tablet',
    name: 'Tablet',
    aliases: ['ipad', 'tablet computer'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Tablets are allowed in both carry-on and checked bags.',
    rules: 'Must be removed from bag during screening. Keep easily accessible.',
    category: 'Electronics'
  },
  {
    id: 'headphones',
    name: 'Headphones',
    aliases: ['earbuds', 'wireless headphones'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Headphones are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Wireless headphones with batteries should be in carry-on.',
    category: 'Electronics'
  },
  {
    id: 'gaming-console',
    name: 'Gaming Console',
    aliases: ['nintendo switch', 'ps5', 'xbox'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Gaming consoles are allowed in both carry-on and checked bags.',
    rules: 'Must be removed from bag during screening. Keep controllers and accessories together.',
    category: 'Electronics'
  },
  {
    id: 'kindle',
    name: 'E-Reader',
    aliases: ['kindle', 'ebook reader'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'E-readers are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Keep easily accessible for screening.',
    category: 'Electronics'
  },
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    aliases: ['apple watch', 'fitbit'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Smartwatches are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Can be worn through security.',
    category: 'Electronics'
  },
  {
    id: 'bluetooth-speaker',
    name: 'Bluetooth Speaker',
    aliases: ['portable speaker', 'wireless speaker'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Bluetooth speakers are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Lithium batteries should be in carry-on if removable.',
    category: 'Electronics'
  },

  // Sharp Objects - Top 10
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
  {
    id: 'nail-clippers',
    name: 'Nail Clippers',
    aliases: ['nail scissors'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Nail clippers are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Standard nail clippers are permitted.',
    category: 'Sharp Objects'
  },
  {
    id: 'tweezers',
    name: 'Tweezers',
    aliases: ['eyebrow tweezers'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Tweezers are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Standard tweezers are permitted.',
    category: 'Sharp Objects'
  },
  {
    id: 'sewing-needles',
    name: 'Sewing Needles',
    aliases: ['needles', 'thread'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Sewing needles are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Keep in a case to avoid injury.',
    category: 'Sharp Objects'
  },
  {
    id: 'box-cutter',
    name: 'Box Cutter',
    aliases: ['utility knife', 'razor blade'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Box cutters are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage only.',
    category: 'Sharp Objects'
  },
  {
    id: 'ice-skates',
    name: 'Ice Skates',
    aliases: ['skates'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Ice skates are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. Blades must be covered.',
    category: 'Sharp Objects'
  },
  {
    id: 'sword',
    name: 'Sword',
    aliases: ['sword', 'blade weapon'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Swords are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared and secured. Check with airline.',
    category: 'Sharp Objects'
  },
  {
    id: 'axe',
    name: 'Axe',
    aliases: ['hatchet', 'chopping tool'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Axes are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. Blade must be covered.',
    category: 'Sharp Objects'
  },

  // Medical - Top 10
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
  {
    id: 'cpap-machine',
    name: 'CPAP Machine',
    aliases: ['sleep apnea machine', 'breathing machine'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'CPAP machines are allowed in both carry-on and checked bags.',
    rules: 'Does not count toward carry-on limit. Keep easily accessible.',
    category: 'Medical'
  },
  {
    id: 'wheelchair',
    name: 'Wheelchair',
    aliases: ['mobility device'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Wheelchairs are allowed and do not count toward baggage limits.',
    rules: 'No restrictions. Airlines provide assistance for mobility devices.',
    category: 'Medical'
  },
  {
    id: 'oxygen-tank',
    name: 'Oxygen Tank',
    aliases: ['oxygen cylinder', 'medical oxygen'],
    carryOn: 'restricted',
    checkedBag: 'restricted',
    description: 'Oxygen tanks require special approval and documentation.',
    rules: 'Must be FAA-approved. Requires medical documentation and airline approval.',
    category: 'Medical'
  },
  {
    id: 'thermometer',
    name: 'Thermometer',
    aliases: ['medical thermometer'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Thermometers are allowed in both carry-on and checked bags.',
    rules: 'Mercury thermometers prohibited. Digital thermometers allowed.',
    category: 'Medical'
  },
  {
    id: 'first-aid-kit',
    name: 'First Aid Kit',
    aliases: ['medical kit', 'bandages'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'First aid kits are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on basic first aid supplies. Sharp objects must follow sharp object rules.',
    category: 'Medical'
  },
  {
    id: 'hearing-aid',
    name: 'Hearing Aid',
    aliases: ['hearing device'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Hearing aids are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Can be worn through security.',
    category: 'Medical'
  },
  {
    id: 'crutches',
    name: 'Crutches',
    aliases: ['mobility aid'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Crutches are allowed and do not count toward baggage limits.',
    rules: 'No restrictions. Airlines provide assistance for mobility devices.',
    category: 'Medical'
  },
  {
    id: 'medical-device',
    name: 'Medical Device',
    aliases: ['medical equipment'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Medical devices are generally allowed in both carry-on and checked bags.',
    rules: 'May require medical documentation. Keep easily accessible.',
    category: 'Medical'
  },

  // Tools - Top 10
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
  {
    id: 'drill',
    name: 'Drill',
    aliases: ['power drill', 'electric drill'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Drills are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. Remove batteries if possible.',
    category: 'Tools'
  },
  {
    id: 'wrench',
    name: 'Wrench',
    aliases: ['adjustable wrench'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Wrenches have size restrictions for carry-on.',
    rules: 'Must be shorter than 7 inches to be allowed in carry-on luggage.',
    category: 'Tools'
  },
  {
    id: 'pliers',
    name: 'Pliers',
    aliases: ['wire cutters'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Pliers have size restrictions for carry-on.',
    rules: 'Must be shorter than 7 inches to be allowed in carry-on luggage.',
    category: 'Tools'
  },
  {
    id: 'saw',
    name: 'Saw',
    aliases: ['hand saw', 'hacksaw'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Saws are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. Blade must be covered.',
    category: 'Tools'
  },
  {
    id: 'level',
    name: 'Level',
    aliases: ['bubble level'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Levels are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard levels.',
    category: 'Tools'
  },
  {
    id: 'tape-measure',
    name: 'Tape Measure',
    aliases: ['measuring tape'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Tape measures are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard tape measures.',
    category: 'Tools'
  },
  {
    id: 'flashlight',
    name: 'Flashlight',
    aliases: ['torch'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Flashlights are allowed in both carry-on and checked bags.',
    rules: 'No restrictions. Remove batteries if possible for checked bags.',
    category: 'Tools'
  },
  {
    id: 'multitool',
    name: 'Multitool',
    aliases: ['swiss army knife', 'leatherman'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Multitools have blade length restrictions for carry-on.',
    rules: 'Blades must be shorter than 4 inches to be allowed in carry-on.',
    category: 'Tools'
  },

  // Food - Top 10
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
  {
    id: 'baby-food',
    name: 'Baby Food',
    aliases: ['infant food', 'baby formula'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Baby food and formula are allowed in reasonable quantities.',
    rules: 'Reasonable quantities allowed. May require additional screening.',
    category: 'Food'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    aliases: ['candy', 'sweets'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Solid chocolate is allowed in both carry-on and checked bags.',
    rules: 'No restrictions on solid chocolate.',
    category: 'Food'
  },
  {
    id: 'fruit',
    name: 'Fresh Fruit',
    aliases: ['apples', 'bananas', 'oranges'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Fresh fruit is allowed in both carry-on and checked bags.',
    rules: 'No restrictions on fresh fruit. Some fruits may be subject to agricultural inspection.',
    category: 'Food'
  },
  {
    id: 'granola-bar',
    name: 'Granola Bar',
    aliases: ['energy bar', 'protein bar'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Granola bars and energy bars are allowed.',
    rules: 'No restrictions on solid food bars.',
    category: 'Food'
  },
  {
    id: 'chips',
    name: 'Chips',
    aliases: ['potato chips', 'snacks'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Chips and similar snacks are allowed.',
    rules: 'No restrictions on solid snacks.',
    category: 'Food'
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    aliases: ['dairy product'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Yogurt is considered a liquid/gel.',
    rules: 'Must be 3.4 oz or smaller containers for carry-on and fit in quart bag.',
    category: 'Food'
  },
  {
    id: 'honey',
    name: 'Honey',
    aliases: ['natural sweetener'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Honey is considered a liquid/gel.',
    rules: 'Must be 3.4 oz or smaller containers for carry-on and fit in quart bag.',
    category: 'Food'
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    aliases: ['cooking oil'],
    carryOn: 'restricted',
    checkedBag: 'allowed',
    description: 'Olive oil is considered a liquid.',
    rules: 'Must be 3.4 oz or smaller containers for carry-on and fit in quart bag.',
    category: 'Food'
  },

  // Sports - Top 10
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
  {
    id: 'tennis-racket',
    name: 'Tennis Racket',
    aliases: ['tennis equipment'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Tennis rackets are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on tennis rackets.',
    category: 'Sports'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    aliases: ['sports ball'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Basketballs are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on sports balls.',
    category: 'Sports'
  },
  {
    id: 'football',
    name: 'Football',
    aliases: ['soccer ball', 'sports ball'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Footballs are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on sports balls.',
    category: 'Sports'
  },
  {
    id: 'hockey-stick',
    name: 'Hockey Stick',
    aliases: ['hockey equipment'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Hockey sticks are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. May require special sporting goods procedures.',
    category: 'Sports'
  },
  {
    id: 'skateboard',
    name: 'Skateboard',
    aliases: ['skateboarding equipment'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Skateboards are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on skateboards.',
    category: 'Sports'
  },
  {
    id: 'bicycle',
    name: 'Bicycle',
    aliases: ['bike', 'cycling equipment'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Bicycles require special handling and may incur fees.',
    rules: 'Must be packed in bike case or box. Check with airline for fees and procedures.',
    category: 'Sports'
  },
  {
    id: 'fishing-pole',
    name: 'Fishing Pole',
    aliases: ['fishing equipment', 'fishing rod'],
    carryOn: 'prohibited',
    checkedBag: 'allowed',
    description: 'Fishing poles are prohibited in carry-on luggage.',
    rules: 'Must be packed in checked baggage. May require special handling.',
    category: 'Sports'
  },
  {
    id: 'bowling-ball',
    name: 'Bowling Ball',
    aliases: ['bowling equipment'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Bowling balls are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on bowling balls.',
    category: 'Sports'
  },

  // Weapons - Top 10
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
  {
    id: 'ammunition',
    name: 'Ammunition',
    aliases: ['bullets', 'cartridges'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Ammunition requires special handling and declaration.',
    rules: 'Must be declared and packed separately from firearms. Check federal and state laws.',
    category: 'Weapons'
  },
  {
    id: 'stun-gun',
    name: 'Stun Gun',
    aliases: ['taser', 'electronic weapon'],
    carryOn: 'prohibited',
    checkedBag: 'prohibited',
    description: 'Stun guns are prohibited in both carry-on and checked bags.',
    rules: 'Completely prohibited on all flights.',
    category: 'Weapons'
  },
  {
    id: 'pepper-spray',
    name: 'Pepper Spray',
    aliases: ['mace', 'self-defense spray'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Pepper spray is restricted and may be prohibited.',
    rules: 'Check with airline and destination laws. Generally prohibited.',
    category: 'Weapons'
  },
  {
    id: 'knife-weapon',
    name: 'Combat Knife',
    aliases: ['fighting knife', 'weapon knife'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Combat knives are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared. Check with airline.',
    category: 'Weapons'
  },
  {
    id: 'brass-knuckles',
    name: 'Brass Knuckles',
    aliases: ['knuckle duster'],
    carryOn: 'prohibited',
    checkedBag: 'prohibited',
    description: 'Brass knuckles are prohibited in both carry-on and checked bags.',
    rules: 'Completely prohibited on all flights.',
    category: 'Weapons'
  },
  {
    id: 'nunchucks',
    name: 'Nunchucks',
    aliases: ['nunchaku'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Nunchucks are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared. Check with airline.',
    category: 'Weapons'
  },
  {
    id: 'throwing-stars',
    name: 'Throwing Stars',
    aliases: ['shuriken'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Throwing stars are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared. Check with airline.',
    category: 'Weapons'
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    aliases: ['bow weapon'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Crossbows are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared. Check with airline.',
    category: 'Weapons'
  },
  {
    id: 'airsoft-gun',
    name: 'Airsoft Gun',
    aliases: ['toy gun', 'replica weapon'],
    carryOn: 'prohibited',
    checkedBag: 'restricted',
    description: 'Airsoft guns are prohibited in carry-on and restricted in checked bags.',
    rules: 'May be allowed in checked bags if properly declared. Check with airline.',
    category: 'Weapons'
  },

  // Miscellaneous - Top 10
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
  },
  {
    id: 'camera-tripod',
    name: 'Camera Tripod',
    aliases: ['tripod'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Camera tripods are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard tripods.',
    category: 'Miscellaneous'
  },
  {
    id: 'musical-instrument',
    name: 'Musical Instrument',
    aliases: ['guitar', 'violin', 'piano'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Musical instruments are allowed in both carry-on and checked bags.',
    rules: 'Fragile instruments should be carried on. Large instruments may require special handling.',
    category: 'Miscellaneous'
  },
  {
    id: 'book',
    name: 'Book',
    aliases: ['magazine', 'newspaper'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Books are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on books and reading materials.',
    category: 'Miscellaneous'
  },
  {
    id: 'candle',
    name: 'Candle',
    aliases: ['wax candle'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Candles are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard candles.',
    category: 'Miscellaneous'
  },
  {
    id: 'battery',
    name: 'Battery',
    aliases: ['alkaline battery', 'lithium battery'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Batteries are allowed with restrictions based on type.',
    rules: 'Alkaline batteries allowed. Lithium batteries under 100Wh allowed. Spare lithium batteries in carry-on only.',
    category: 'Miscellaneous'
  },
  {
    id: 'lock',
    name: 'Lock',
    aliases: ['padlock', 'combination lock'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Locks are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard locks.',
    category: 'Miscellaneous'
  },
  {
    id: 'toy',
    name: 'Toy',
    aliases: ['children toy', 'game'],
    carryOn: 'allowed',
    checkedBag: 'allowed',
    description: 'Toys are allowed in both carry-on and checked bags.',
    rules: 'No restrictions on standard toys. Battery-operated toys follow battery rules.',
    category: 'Miscellaneous'
  }
];

// Helper functions
const searchItems = (query) => {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return tsaItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.aliases.some(alias => alias.toLowerCase().includes(lowercaseQuery)) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 20);
};

const getItemsByCategory = (category) => {
  if (category === 'all') return tsaItems.slice(0, 50);
  return tsaItems.filter(item => item.category === category).slice(0, 10);
};

const getAllCategories = () => {
  const categories = [...new Set(tsaItems.map(item => item.category))];
  return categories.sort();
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TSA Search API is running' });
});

// Get all items
app.get('/api/items', (req, res) => {
  const { category, limit = 50 } = req.query;
  
  if (category && category !== 'all') {
    const items = tsaItems.filter(item => item.category === category).slice(0, parseInt(limit));
    res.json(items);
  } else {
    res.json(tsaItems.slice(0, parseInt(limit)));
  }
});

// Search items
app.get('/api/search', (req, res) => {
  const { q: query } = req.query;
  
  if (!query) {
    return res.json([]);
  }
  
  const results = searchItems(query);
  res.json(results);
});

// Get categories
app.get('/api/categories', (req, res) => {
  res.json(getAllCategories());
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = tsaItems.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// Get items by category
app.get('/api/categories/:category', (req, res) => {
  const { category } = req.params;
  const items = getItemsByCategory(category);
  
  res.json({
    category: category,
    items: items,
    count: items.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TSA Search Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/search?q=water`);
  console.log(`📊 Total items: ${tsaItems.length}`);
  console.log(`📂 Categories: ${getAllCategories().join(', ')}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
}); 