import { PrismaClient, type ListingStatus, type PropertyType } from "@prisma/client";

const prisma = new PrismaClient();

type SeedListing = {
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: ListingStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  yearBuilt: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  amenities: string[];
  agent: number;
  photos: string[];
};

const PHOTO_SETS = [
  [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1600&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=70",
  ],
  [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=70",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=70",
  ],
];

const AGENTS = [
  {
    name: "Amara Okafor",
    email: "amara@haven.example.com",
    phone: "(415) 555-0142",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=70",
    bio: "Fifteen years selling waterfront and hillside homes across the Bay Area.",
  },
  {
    name: "Daniel Ruiz",
    email: "daniel@haven.example.com",
    phone: "(512) 555-0119",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=70",
    bio: "Specialist in new-build condos and first-time buyers in Central Texas.",
  },
  {
    name: "Sofia Lindgren",
    email: "sofia@haven.example.com",
    phone: "(212) 555-0188",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=70",
    bio: "Luxury rentals and pre-war co-ops in Manhattan and Brooklyn.",
  },
];

const LISTINGS: SeedListing[] = [
  {
    title: "Sunlit Craftsman with Bay Views",
    description:
      "A restored 1926 Craftsman on a quiet Noe Valley street. The main floor opens to a chef's kitchen with quartz counters and a breakfast nook overlooking the garden. Upstairs, three bedrooms share a skylit landing, and the primary suite frames the downtown skyline.",
    price: 2450000,
    type: "HOUSE",
    status: "FOR_SALE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2680,
    yearBuilt: 1926,
    address: "1284 Sanchez Street",
    city: "San Francisco",
    state: "CA",
    zip: "94114",
    latitude: 37.7508,
    longitude: -122.4293,
    featured: true,
    amenities: ["Garden", "Fireplace", "Garage", "Hardwood floors", "Solar panels"],
    agent: 0,
    photos: PHOTO_SETS[0],
  },
  {
    title: "Glass-Walled Modern in the Hills",
    description:
      "Architect-designed retreat with floor-to-ceiling glass, an infinity-edge pool and canyon views from every room. Open plan living flows onto a cantilevered deck built for evening entertaining.",
    price: 3890000,
    type: "HOUSE",
    status: "FOR_SALE",
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 4120,
    yearBuilt: 2019,
    address: "88 Skyline Ridge Road",
    city: "San Francisco",
    state: "CA",
    zip: "94131",
    latitude: 37.7449,
    longitude: -122.4409,
    featured: true,
    amenities: ["Pool", "Home office", "Smart home", "EV charger", "Wine cellar"],
    agent: 0,
    photos: PHOTO_SETS[1],
  },
  {
    title: "Marina District Two-Bedroom Condo",
    description:
      "Bright corner condo one block from the waterfront promenade. Recently updated kitchen, in-unit laundry, deeded parking and a shared roof deck with Golden Gate views.",
    price: 1195000,
    type: "CONDO",
    status: "FOR_SALE",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1180,
    yearBuilt: 2004,
    address: "2320 Beach Street, Unit 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94123",
    latitude: 37.8054,
    longitude: -122.4426,
    featured: false,
    amenities: ["Roof deck", "In-unit laundry", "Parking", "Elevator"],
    agent: 0,
    photos: PHOTO_SETS[2],
  },
  {
    title: "Garden Apartment near Dolores Park",
    description:
      "Ground-floor one-bedroom with a private patio, exposed brick and a renovated bath. Steps from the park, the J-Church line and Valencia Street cafes.",
    price: 3850,
    type: "APARTMENT",
    status: "FOR_RENT",
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 720,
    yearBuilt: 1948,
    address: "471 Guerrero Street, Apt 1",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    latitude: 37.7627,
    longitude: -122.4241,
    featured: false,
    amenities: ["Private patio", "Pet friendly", "Dishwasher"],
    agent: 0,
    photos: PHOTO_SETS[3],
  },
  {
    title: "Hill Country Ranch on Five Acres",
    description:
      "Single-story limestone ranch with wraparound porch, a stocked pond and mature oaks. Barn and workshop convey; the property is fully fenced and irrigation-ready.",
    price: 1275000,
    type: "HOUSE",
    status: "FOR_SALE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3240,
    yearBuilt: 2008,
    address: "9410 Fitzhugh Road",
    city: "Austin",
    state: "TX",
    zip: "78736",
    latitude: 30.2469,
    longitude: -98.0231,
    featured: true,
    amenities: ["Acreage", "Barn", "Well water", "Porch", "Workshop"],
    agent: 1,
    photos: PHOTO_SETS[4],
  },
  {
    title: "Downtown High-Rise Condo with Skyline Views",
    description:
      "Twenty-eighth floor residence with wall-to-wall windows, European cabinetry and a wrap balcony above Lady Bird Lake. Building amenities include a lap pool, gym and 24-hour concierge.",
    price: 895000,
    type: "CONDO",
    status: "FOR_SALE",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1340,
    yearBuilt: 2017,
    address: "300 Bowie Street, Unit 2807",
    city: "Austin",
    state: "TX",
    zip: "78703",
    latitude: 30.2661,
    longitude: -97.7513,
    featured: true,
    amenities: ["Concierge", "Pool", "Gym", "Balcony", "Parking"],
    agent: 1,
    photos: PHOTO_SETS[5],
  },
  {
    title: "East Austin Townhouse with Rooftop",
    description:
      "Three-level townhouse steps from the East 6th corridor. Polished concrete on the main floor, two suites above and a rooftop terrace plumbed for an outdoor kitchen.",
    price: 685000,
    type: "TOWNHOUSE",
    status: "PENDING",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 1890,
    yearBuilt: 2021,
    address: "1712 East 6th Street, Unit B",
    city: "Austin",
    state: "TX",
    zip: "78702",
    latitude: 30.2606,
    longitude: -97.7233,
    featured: false,
    amenities: ["Rooftop terrace", "Garage", "Smart home", "Tankless water heater"],
    agent: 1,
    photos: PHOTO_SETS[0],
  },
  {
    title: "Loft Apartment in the Warehouse District",
    description:
      "Converted warehouse loft with 14-foot ceilings, original timber beams and a mezzanine bedroom. Walkable to music venues and the farmers market.",
    price: 2650,
    type: "APARTMENT",
    status: "FOR_RENT",
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 980,
    yearBuilt: 1938,
    address: "412 West 3rd Street, Loft 5",
    city: "Austin",
    state: "TX",
    zip: "78701",
    latitude: 30.2669,
    longitude: -97.7476,
    featured: false,
    amenities: ["High ceilings", "Exposed brick", "Pet friendly", "Bike storage"],
    agent: 1,
    photos: PHOTO_SETS[1],
  },
  {
    title: "Buildable Lakeview Lot",
    description:
      "Just over an acre of gently sloping land with utilities at the street and approved plans for a 3,000 sq ft residence. Panoramic views west toward the lake.",
    price: 420000,
    type: "LAND",
    status: "FOR_SALE",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 45302,
    yearBuilt: 2024,
    address: "Lot 14, Comanche Trail",
    city: "Austin",
    state: "TX",
    zip: "78732",
    latitude: 30.4102,
    longitude: -97.9067,
    featured: false,
    amenities: ["Utilities at street", "Approved plans", "Lake views"],
    agent: 1,
    photos: PHOTO_SETS[2],
  },
  {
    title: "Pre-War Co-op on the Upper West Side",
    description:
      "Classic six with beamed ceilings, herringbone floors and a windowed eat-in kitchen. Full-service building a block from Riverside Park with a live-in super.",
    price: 2150000,
    type: "APARTMENT",
    status: "FOR_SALE",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1720,
    yearBuilt: 1928,
    address: "310 West 86th Street, Apt 8C",
    city: "New York",
    state: "NY",
    zip: "10024",
    latitude: 40.7876,
    longitude: -73.9762,
    featured: true,
    amenities: ["Doorman", "Storage", "Laundry room", "Prewar details"],
    agent: 2,
    photos: PHOTO_SETS[3],
  },
  {
    title: "Brooklyn Brownstone Duplex",
    description:
      "Owner's duplex in a restored 1899 brownstone: parlor-level living with double-height windows, three bedrooms below and exclusive use of the landscaped rear garden.",
    price: 7800,
    type: "TOWNHOUSE",
    status: "FOR_RENT",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 2100,
    yearBuilt: 1899,
    address: "148 Sterling Place",
    city: "Brooklyn",
    state: "NY",
    zip: "11217",
    latitude: 40.6773,
    longitude: -73.9702,
    featured: true,
    amenities: ["Private garden", "Fireplace", "Dishwasher", "Central air"],
    agent: 2,
    photos: PHOTO_SETS[4],
  },
  {
    title: "Tribeca Loft with Private Elevator",
    description:
      "Full-floor loft delivered by a keyed elevator, with 3,400 square feet of column-free space, oversized steel windows and a chef's kitchen anchored by a marble island.",
    price: 6450000,
    type: "CONDO",
    status: "FOR_SALE",
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3400,
    yearBuilt: 1911,
    address: "62 Franklin Street, Floor 5",
    city: "New York",
    state: "NY",
    zip: "10013",
    latitude: 40.7181,
    longitude: -74.0043,
    featured: false,
    amenities: ["Private elevator", "Concierge", "Gym", "Wine storage", "Central air"],
    agent: 2,
    photos: PHOTO_SETS[5],
  },
  {
    title: "Sold: Park Slope Limestone Row House",
    description:
      "Four-story limestone with original mantels, a chef's kitchen and a south-facing garden. Recorded sale kept online for comparable pricing research.",
    price: 3250000,
    type: "HOUSE",
    status: "SOLD",
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 3800,
    yearBuilt: 1905,
    address: "512 3rd Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11215",
    latitude: 40.6698,
    longitude: -73.9846,
    featured: false,
    amenities: ["Garden", "Fireplace", "Original details"],
    agent: 2,
    photos: PHOTO_SETS[0],
  },
  {
    title: "Beachfront Condo on Ocean Drive",
    description:
      "Renovated two-bedroom with direct Atlantic views, impact glass throughout and a private beach entrance. Building offers valet, spa and an oceanfront pool deck.",
    price: 1450000,
    type: "CONDO",
    status: "FOR_SALE",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1260,
    yearBuilt: 2012,
    address: "1500 Ocean Drive, Unit 903",
    city: "Miami Beach",
    state: "FL",
    zip: "33139",
    latitude: 25.7863,
    longitude: -80.1301,
    featured: true,
    amenities: ["Ocean view", "Valet", "Pool", "Spa", "Beach access"],
    agent: 0,
    photos: PHOTO_SETS[1],
  },
  {
    title: "Coral Gables Mediterranean Villa",
    description:
      "Barrel-tile villa on a corner lot with a courtyard fountain, summer kitchen and heated saltwater pool. Impact windows and a whole-house generator were added in 2022.",
    price: 2790000,
    type: "HOUSE",
    status: "FOR_SALE",
    bedrooms: 5,
    bathrooms: 5,
    areaSqft: 4360,
    yearBuilt: 1994,
    address: "740 Alhambra Circle",
    city: "Coral Gables",
    state: "FL",
    zip: "33134",
    latitude: 25.7412,
    longitude: -80.2712,
    featured: false,
    amenities: ["Pool", "Generator", "Summer kitchen", "Impact windows", "Courtyard"],
    agent: 0,
    photos: PHOTO_SETS[2],
  },
  {
    title: "Capitol Hill Craftsman Townhouse",
    description:
      "Three-bedroom townhouse with a heat pump, EV-ready garage and a roof deck framing Mount Rainier on clear days. Two blocks from the light rail station.",
    price: 985000,
    type: "TOWNHOUSE",
    status: "FOR_SALE",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 1840,
    yearBuilt: 2016,
    address: "1219 East Olive Street",
    city: "Seattle",
    state: "WA",
    zip: "98122",
    latitude: 47.6155,
    longitude: -122.3167,
    featured: false,
    amenities: ["Roof deck", "EV charger", "Heat pump", "Garage"],
    agent: 2,
    photos: PHOTO_SETS[3],
  },
  {
    title: "Ballard Bungalow with Studio",
    description:
      "Updated 1940s bungalow with a detached studio ideal for work-from-home, plus raised beds and a covered patio for Northwest winters.",
    price: 849000,
    type: "HOUSE",
    status: "FOR_SALE",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1620,
    yearBuilt: 1941,
    address: "6710 20th Avenue NW",
    city: "Seattle",
    state: "WA",
    zip: "98117",
    latitude: 47.6771,
    longitude: -122.3846,
    featured: false,
    amenities: ["Detached studio", "Covered patio", "Garden beds", "Fireplace"],
    agent: 2,
    photos: PHOTO_SETS[4],
  },
  {
    title: "South Lake Union One-Bedroom Rental",
    description:
      "Corner one-bedroom in a LEED-certified tower with a co-working lounge, rooftop terrace and skybridge access to the waterfront trail.",
    price: 2950,
    type: "APARTMENT",
    status: "FOR_RENT",
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 760,
    yearBuilt: 2020,
    address: "440 Terry Avenue N, Unit 1204",
    city: "Seattle",
    state: "WA",
    zip: "98109",
    latitude: 47.6237,
    longitude: -122.3364,
    featured: false,
    amenities: ["Co-working lounge", "Rooftop terrace", "Gym", "Pet friendly"],
    agent: 2,
    photos: PHOTO_SETS[5],
  },
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  await prisma.inquiry.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.agent.deleteMany();

  const agents = [];
  for (const agent of AGENTS) {
    agents.push(await prisma.agent.create({ data: agent }));
  }

  for (const [index, listing] of LISTINGS.entries()) {
    const { agent, photos, ...rest } = listing;
    await prisma.listing.create({
      data: {
        ...rest,
        slug: `${slugify(listing.title)}-${slugify(listing.city)}`,
        agentId: agents[agent].id,
        createdAt: new Date(Date.now() - index * 36 * 60 * 60 * 1000),
        images: {
          create: photos.map((url, position) => ({
            url,
            position,
            alt: `${listing.title} — photo ${position + 1}`,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${agents.length} agents and ${LISTINGS.length} listings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
