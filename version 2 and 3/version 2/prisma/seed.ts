import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.vote.deleteMany();
  await prisma.votingCrop.deleteMany();
  await prisma.votingRound.deleteMany();
  await prisma.produceItem.deleteMany();
  await prisma.livestockItem.deleteMany();
  await prisma.galleryPhoto.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log("Cleared existing seed data.");

  const produce = await Promise.all([
    prisma.produceItem.create({
      data: {
        name: "Butternut",
        description: "Rich, sweet butternut grown in the winter sun.",
        category: "Vegetables",
        seasonality: "Winter",
        inSeason: true,
        imageUrl: "/images/produce/butternut.jpg",
        displayOrder: 1,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: "Tomatoes",
        description: "Vine-ripened red and full of flavour.",
        category: "Fruits",
        seasonality: "Summer",
        inSeason: true,
        imageUrl: "/images/produce/tomatoes.jpg",
        displayOrder: 2,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: "Chillies",
        description: "Hot and spicy, perfect for peri-peri.",
        category: "Vegetables",
        seasonality: "Year-round",
        inSeason: true,
        imageUrl: "/images/produce/chillies.jpg",
        displayOrder: 3,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: "Spinach",
        description: "Dark green leafy bundles, cut daily.",
        category: "Vegetables",
        seasonality: "Autumn",
        inSeason: false,
        imageUrl: "/images/produce/spinach.jpg",
        displayOrder: 4,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: "Maize",
        description: "Mealie meal ready, grown in the rich Limpopo soil.",
        category: "Grains",
        seasonality: "Summer",
        inSeason: false,
        imageUrl: "/images/produce/maize.jpg",
        displayOrder: 5,
      },
    }),
    prisma.produceItem.create({
      data: {
        name: "Coriander",
        description: "Fresh dhania bunches, fragrant and homegrown.",
        category: "Herbs",
        seasonality: "Year-round",
        inSeason: true,
        imageUrl: "/images/produce/coriander.jpg",
        displayOrder: 6,
      },
    }),
  ]);

  console.log(`${produce.length} Produce items seeded.`);

  const livestock = await Promise.all([
    prisma.livestockItem.create({
      data: {
        name: "Bull #3",
        photoUrl: "/images/livestock/bull.jpg",
        priceRange: "R12,000 - R15,000",
        availabilityStatus: "Available",
        displayOrder: 1,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: "Nguni Cow",
        photoUrl: "/images/livestock/cow.jpg",
        priceRange: "R9,500 - R11,000",
        availabilityStatus: "ComingSoon",
        displayOrder: 2,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: "Boer Goat",
        photoUrl: "/images/livestock/goat.jpg",
        priceRange: "R1,800 - R2,500",
        availabilityStatus: "Available",
        displayOrder: 3,
      },
    }),
    prisma.livestockItem.create({
      data: {
        name: "Dorper Sheep",
        photoUrl: "/images/livestock/sheep.jpg",
        priceRange: "R2,200 - R2,800",
        availabilityStatus: "Sold",
        displayOrder: 4,
      },
    }),
  ]);

  console.log(`${livestock.length} Livestock items seeded.`);

  const round = await prisma.votingRound.create({
    data: {
      title: "What's Growing This Season?",
      description: "Help us decide what to plant next.",
      isActive: true,
      startDate: new Date("2026-01-01"),
    },
  });

  const crops = await Promise.all([
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: "Cabbage",
        photoUrl: "/images/vote/cabbage.jpg",
      },
    }),
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: "Sweet Potato",
        photoUrl: "/images/vote/sweetpotato.jpg",
      },
    }),
    prisma.votingCrop.create({
      data: {
        votingRoundId: round.id,
        name: "Groundnuts",
        photoUrl: "/images/vote/groundnuts.jpg",
      },
    }),
  ]);

  console.log(`1 Voting round + ${crops.length} crops seeded.`);

  const galleryEntries = [
    { url: "/images/gallery/field-sunset.jpg", alt: "Sunset over the maize fields", category: "Fields", order: 1 },
    { url: "/images/gallery/farmer.jpg", alt: "Goddard at the farm gate", category: "People", order: 2 },
    { url: "/images/gallery/goats.jpg", alt: "Boer goats grazing", category: "Livestock", order: 3 },
    { url: "/images/gallery/gallery-04.jpeg", alt: "Farm scene", category: "Fields", order: 4 },
    { url: "/images/gallery/gallery-05.jpeg", alt: "Farm scene", category: "Fields", order: 5 },
    { url: "/images/gallery/gallery-06.jpeg", alt: "Farm scene", category: "Livestock", order: 6 },
    { url: "/images/gallery/gallery-07.jpeg", alt: "Farm scene", category: "Fields", order: 7 },
    { url: "/images/gallery/gallery-08.jpeg", alt: "Farm scene", category: "People", order: 8 },
    { url: "/images/gallery/gallery-09.jpeg", alt: "Farm scene", category: "Livestock", order: 9 },
    { url: "/images/gallery/gallery-10.jpeg", alt: "Farm scene", category: "Fields", order: 10 },
    { url: "/images/gallery/gallery-11.jpeg", alt: "Farm scene", category: "People", order: 11 },
    { url: "/images/gallery/gallery-12.jpeg", alt: "Farm scene", category: "Livestock", order: 12 },
    { url: "/images/gallery/gallery-13.jpeg", alt: "Farm scene", category: "Fields", order: 13 },
    { url: "/images/gallery/gallery-14.jpeg", alt: "Farm scene", category: "People", order: 14 },
    { url: "/images/gallery/gallery-15.jpeg", alt: "Farm scene", category: "Livestock", order: 15 },
    { url: "/images/gallery/gallery-16.jpeg", alt: "Farm scene", category: "Fields", order: 16 },
    { url: "/images/gallery/gallery-17.jpeg", alt: "Farm scene", category: "People", order: 17 },
    { url: "/images/gallery/gallery-18.jpeg", alt: "Farm scene", category: "Livestock", order: 18 },
    { url: "/images/gallery/gallery-19.jpeg", alt: "Farm scene", category: "Fields", order: 19 },
    { url: "/images/gallery/gallery-20.jpeg", alt: "Farm scene", category: "People", order: 20 },
    { url: "/images/gallery/gallery-21.jpeg", alt: "Farm scene", category: "Livestock", order: 21 },
    { url: "/images/gallery/gallery-22.jpeg", alt: "Farm scene", category: "Fields", order: 22 },
    { url: "/images/gallery/gallery-23.jpeg", alt: "Farm scene", category: "People", order: 23 },
    { url: "/images/gallery/gallery-24.jpeg", alt: "Men standing on the farm", category: "People", order: 24 },
    { url: "/images/gallery/gallery-25.jpeg", alt: "Spraying ground where cows live", category: "Livestock", order: 25 },
    { url: "/images/gallery/gallery-26.jpeg", alt: "Spraying ground where cows live", category: "Livestock", order: 26 },
    { url: "/images/gallery/gallery-27.jpeg", alt: "Tomatoes on bush", category: "Fields", order: 27 },
  ];

  const gallery = await Promise.all(
    galleryEntries.map((entry) =>
      prisma.galleryPhoto.create({
        data: {
          url: entry.url,
          alt: entry.alt,
          category: entry.category,
          displayOrder: entry.order,
        },
      })
    )
  );

  console.log(`${gallery.length} Gallery photos seeded.`);

  await prisma.adminUser.create({
    data: {
      email: "admin@goddardprojects.co.za",
      passwordHash: "farm2026",
    },
  });

  console.log("Admin user seeded.");
  console.log("");
  console.log("Seed complete. Run `npm run dev` and visit http://localhost:3000");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
