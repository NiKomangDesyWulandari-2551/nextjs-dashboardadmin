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

const products = {
  food: [
    {
      id: 11,
      name: "Spiderweb Quesadilla",
      price: 50000,
      image: "/Spiderweb Quesadilla.jpg",
      description:
        "Quesadilla hitam dengan keju meleleh yang membentuk jaring laba-laba. Hati-hati, jangan sampai laba-laba keluar dari dalamnya!",
    },
    {
      id: 12,
      name: "Bloody Eyeball Bites",
      price: 30000,
      image: "/Bloody Eyeball Bites.jpg",
      description:
        "Gigitan bola daging dengan bola mata zaitun hitam, mengeluarkan darah setiap gigitan. Siap-siap terkejut!",
    },
    {
      id: 13,
      name: "Spooky Ghost Pizza",
      price: 75000,
      image: "/Spooky Gosht Pizza.jpg",
      description:
        "Pizza dengan keju mozzarella berbentuk hantu yang melayang. Rasakan sensasi dingin di tenggorokan seperti roh yang menuntut balas!",
    },
    {
      id: 14,
      name: "Witch’s Fingers",
      price: 20000,
      image: "/Witch’s Fingers.jpg",
      description:
        "Telur setan disulap jadi tatapan horor—mata berdarah yang siap memeriahkan pesta Halloween-mu!",
    },
    {
      id: 15,
      name: "Buried Alive Bites",
      price: 25000,
      image: "/Buried Alive Bites.jpg",
      description:
        "Kue cokelat yang tampak terkubur di dalam tanah, dengan lapisan brownie yang lembut dan cacing gummy yang menjulur keluar dari dalamnya. Jangan takut, itu hanya rasa manis!",
    },
  ],

  drink: [
    {
      id: 16,
      name: "Bloody Vision",
      price: 30000,
      image: "/Bloody Vision.jpg",
      description:
        "Koktail merah menyala berisi 'bola mata' buah dan jelly—minuman segar yang tampak mengerikan tapi nikmat!",
    },
    {
      id: 17,
      name: "Bloody Elixir",
      price: 30000,
      image: "/Bloody Elixir.jpg",
      description:
        "Ramuan merah pekat yang menggoda, terbuat dari jus delima yang memiliki kekuatan gelap. Hati-hati, sekali menyesap, kamu takkan bisa berhenti!",
    },
    {
      id: 18,
      name: "Graveyard Pudding",
      price: 25000,
      image: "/Graveyard Pudding.jpg",
      description:
        "Puding gelap dengan rasa mencekam, siap membawa Anda ke dunia yang tak terlihat",
    },
    {
      id: 19,
      name: "Haunted Ghost Shake",
      price: 28000,
      image: "/Haunted Ghost Shake.jpg",
      description:
        "Minuman es krim yang membawa sensasi arwah gentayangan, menambah misteri di setiap tegukan. Hati-Hati kamu bisa didatangi oleh arwah gentayangan!",
    },
    {
      id: 20,
      name: "Vampire Blood Bags",
      price: 40000,
      image: "/Vampire Blood Bags.jpg",
      description:
        "Minuman darah vampir yang penuh misteri, menggetarkan dalam setiap tetesnya. Berani coba?",
    },
  ],
};


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
  { week: "Week 1 (15-21 Apr)", revenue: 2100000 },
  { week: "Week 2 (22-28 Apr)", revenue: 2800000 },
  { week: "Week 3 (29 Apr-5 May)", revenue: 1700000 },
  { week: "Week 4 (6-14 May)", revenue: 1055000 },
];


export { users, customers, invoices, revenue, products};
