// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
   {
    id: 1,
    name: "Count Vladislaus",
    username: "admin123",
    password: "12345",
    role: "admin",
  },
  {
    id: 2,
    name: "Witch Morgana",
    username: "darkwitch",
    password: "hex666",
    role: "admin",
  },
  {
    id: 3,
    name: "Phantom Grim",
    username: "shadowlord",
    password: "ghost999",
    role: "admin",
  },
];


const customers = [
  {
    id: 1,
    name: "Vlad Dracul",
    email: "user123",
    password: "12345",
    role: "customer",
  },
  {
    id: 2,
    name: "Morgana LeFay",
    email: "morlefay01@gmail.com",
    password: "darkmagic2023",
    role: "customer",
  },
  {
    id: 3,
    name: "Grim Reaper",
    email: "grimrside@gmail.com",
    password: "death666",
    role: "customer",
  },
  {
    id: 4,
    name: "Lilith Nightshade",
    email: "lilithana@gmail.com",
    password: "shadow999",
    role: "customer",
  },
  {
    id: 5,
    name: "Banshee Wail",
    email: "wailananana@gmail.com",
    password: "scream1010",
    role: "customer",
  },
  {
    id: 6,
    name: "Nosferatu Zodd",
    email: "nosferatu.zodd@gmail.com",
    password: "bloodthirst321",
    role: "customer",
  },
  
  {
    id: 7,
    name: "Raven Hex",
    email: "raven.hex@gmail.com",
    password: "curse777",
    role: "customer",
  },
  {
    id: 8,
    name: "Draven Gloom",
    email: "c",
    password: "darkness456",
    role: "customer",
  },
  {
    id: 9,
    name: "Selene Wraith",
    email: "selene.wraith@gmail.com",
    password: "ghostly123",
    role: "customer",
  },
  {
    id: 10,
    name: "Zephyr Ghoul",
    email: "zephyr.ghoul@gmail.com",
    password: "haunt555",
    role: "customer",
  },
];


const invoices = [
  {
    id: "INV001",
    customerName: "Vlad Dracul",
    customerEmail: "user123",
    amount: 155000,
    date: "2025-05-14",
    status: "paid",
    items: [
      { name: "Witch’s Fingers", quantity: 2, price: 20000 },
      { name: "Bloody Elixir", quantity: 3, price: 30000 },
      { name: "Spooky Ghost Pizza", quantity: 1, price: 75000 },
    ],
  },

  {
    id: "INV002",
    customerName: "Morgana LeFay",
    customerEmail: "morlefay01@gmail.com",
    amount: 85000,
    date: "2025-05-13",
    status: "pending",
    items: [
      { name: "Spiderweb Quesadilla", quantity: 1, price: 50000 },
      { name: "Vampire Blood Bags", quantity: 1, price: 35000 },
    ],
  },

  {
    id: "INV003",
    customerName: "Grim Reaper",
    customerEmail: "grimrside@gmail.com",
    amount: 60000,
    date: "2025-05-12",
    status: "paid",
    items: [
      { name: "Haunted Ghost Shake", quantity: 2, price: 28000 },
      { name: "Graveyard Pudding", quantity: 1, price: 25000 },
    ],
  },

  {
    id: "INV004",
    customerName: "Lilith Nightshade",
    customerEmail: "lilithana@gmail.com",
    amount: 130000,
    date: "2025-05-11",
    status: "cancelled",
    items: [
      { name: "Spooky Ghost Pizza", quantity: 1, price: 75000 },
      { name: "Bloody Eyeball Bites", quantity: 2, price: 30000 },
    ],
  },

  {
    id: "INV005",
    customerName: "Banshee Wail",
    customerEmail: "wailananana@gmail.com",
    amount: 90000,
    date: "2025-05-10",
    status: "paid",
    items: [
      { name: "Mummy Hot Dogs", quantity: 2, price: 45000 },
    ],
  },

  {
    id: "INV006",
    customerName: "Nosferatu Zodd",
    customerEmail: "nosferatu.zodd@gmail.com",
    amount: 168000,
    date: "2025-05-09",
    status: "pending",
    items: [
      { name: "Goblin Green Sliders", quantity: 2, price: 55000 },
      { name: "Phantom Fog Latte", quantity: 2, price: 38000 },
    ],
  },

  {
    id: "INV007",
    customerName: "Raven Hex",
    customerEmail: "raven.hex@gmail.com",
    amount: 75000,
    date: "2025-05-08",
    status: "paid",
    items: [
      { name: "Haunted Pumpkin Pie", quantity: 1, price: 60000 },
      { name: "Ghoul’s Glowing Juice", quantity: 1, price: 32000 },
    ],
  },

  {
    id: "INV008",
    customerName: "Draven Gloom",
    customerEmail: "draven.gloom@gmail.com",
    amount: 105000,
    date: "2025-05-07",
    status: "paid",
    items: [
      { name: "Cursed Cauliflower Brains", quantity: 2, price: 40000 },
      { name: "Witch’s Cauldron Brew", quantity: 1, price: 35000 },
    ],
  },

  {
    id: "INV009",
    customerName: "Selene Wraith",
    customerEmail: "selene.wraith@gmail.com",
    amount: 82000,
    date: "2025-05-06",
    status: "pending",
    items: [
      { name: "Skeleton Bone Milkshake", quantity: 1, price: 40000 },
      { name: "Zombie Slush", quantity: 1, price: 33000 },
    ],
  },

  {
    id: "INV010",
    customerName: "Zephyr Ghoul",
    customerEmail: "zephyr.ghoul@gmail.com",
    amount: 115000,
    date: "2025-05-05",
    status: "cancelled",
    items: [
      { name: "Graveyard Taco Dip", quantity: 1, price: 50000 },
      { name: "Buried Alive Bites", quantity: 2, price: 25000 },
    ],
  },
];


const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, customers, invoices, revenue };
