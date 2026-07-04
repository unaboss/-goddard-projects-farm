import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.vote.deleteMany();
  await prisma.votingCrop.deleteMany();
  await prisma.votingRound.deleteMany();
  await prisma.produceItem.deleteMany();
  await prisma.livestockItem.deleteMany();
  await prisma.galleryPhoto.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.adminUser.deleteMany();

  const produce = await Promise.all([
    prisma.produceItem.create({ data: { name: 'Butternut', description: 'Rich, sweet butternut grown in the winter sun.', category: 'Vegetables', seasonality: 'Winter', inSeason: true, imageUrl: '/images/produce/butternut.jpeg', displayOrder: 1 } }),
    prisma.produceItem.create({ data: { name: 'Tomatoes', description: 'Vine-ripened red and full of flavour.', category: 'Fruits', seasonality: 'Summer', inSeason: true, imageUrl: '/images/produce/tomatoes.jpeg', displayOrder: 2 } }),
    prisma.produceItem.create({ data: { name: 'Chillies', description: 'Hot and spicy, perfect for peri-peri.', category: 'Vegetables', seasonality: 'Year-round', inSeason: true, imageUrl: '/images/produce/chillies.jpeg', displayOrder: 3 } }),
    prisma.produceItem.create({ data: { name: 'Spinach', description: 'Dark green leafy bundles, cut daily.', category: 'Vegetables', seasonality: 'Autumn', inSeason: false, imageUrl: '/images/produce/spinach.jpeg', displayOrder: 4 } }),
    prisma.produceItem.create({ data: { name: 'Maize', description: 'Mealie meal ready, grown in the rich Limpopo soil.', category: 'Grains', seasonality: 'Summer', inSeason: false, imageUrl: '/images/produce/maize.jpeg', displayOrder: 5 } }),
    prisma.produceItem.create({ data: { name: 'Coriander', description: 'Fresh dhania bunches, fragrant and homegrown.', category: 'Herbs', seasonality: 'Year-round', inSeason: true, imageUrl: '/images/produce/coriander.jpeg', displayOrder: 6 } }),
  ]);
  console.log(`${produce.length} Produce items seeded.`);

  const livestock = await Promise.all([
    prisma.livestockItem.create({ data: { name: 'Bull #3', photoUrl: '/images/livestock/bull.jpeg', priceRange: 'R12,000 \u2013 R15,000', availabilityStatus: 'Available', displayOrder: 1 } }),
    prisma.livestockItem.create({ data: { name: 'Nguni Cow', photoUrl: '/images/livestock/cow.jpeg', priceRange: 'R9,500 \u2013 R11,000', availabilityStatus: 'ComingSoon', displayOrder: 2 } }),
    prisma.livestockItem.create({ data: { name: 'Boer Goat', photoUrl: '/images/livestock/goat.jpeg', priceRange: 'R1,800 \u2013 R2,500', availabilityStatus: 'Available', displayOrder: 3 } }),
    prisma.livestockItem.create({ data: { name: 'Dorper Sheep', photoUrl: '/images/livestock/sheep.jpeg', priceRange: 'R2,200 \u2013 R2,800', availabilityStatus: 'Sold', displayOrder: 4 } }),
  ]);
  console.log(`${livestock.length} Livestock items seeded.`);

  const round = await prisma.votingRound.create({ data: { title: "What's Growing This Season?", description: 'Help us decide what to plant next.', isActive: true, startDate: new Date('2026-01-01') } });
  await Promise.all([
    prisma.votingCrop.create({ data: { votingRoundId: round.id, name: 'Cabbage', photoUrl: '/images/vote/cabbage.jpeg' } }),
    prisma.votingCrop.create({ data: { votingRoundId: round.id, name: 'Sweet Potato', photoUrl: '/images/vote/sweetpotato.jpeg' } }),
    prisma.votingCrop.create({ data: { votingRoundId: round.id, name: 'Groundnuts', photoUrl: '/images/vote/groundnuts.jpeg' } }),
  ]);
  console.log('1 Voting round + 3 crops seeded.');

  await Promise.all([
    prisma.galleryPhoto.create({ data: { url: '/images/gallery/field-sunset.jpeg', alt: 'Farm produce and crops', category: 'Fields', displayOrder: 1 } }),
    prisma.galleryPhoto.create({ data: { url: '/images/gallery/farmer.jpeg', alt: 'Farmers at work on the land', category: 'People', displayOrder: 2 } }),
    prisma.galleryPhoto.create({ data: { url: '/images/gallery/goats.jpeg', alt: 'Farm activity and livestock area', category: 'Livestock', displayOrder: 3 } }),
  ]);
  console.log('3 Gallery photos seeded.');

  await prisma.adminUser.create({ data: { email: 'admin@goddardprojects.co.za', passwordHash: 'farm2026' } });
  console.log('Admin user seeded.');
  console.log('\nSeed complete. Run `npm run dev` to start.');
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
