import { seedAdmin } from './seeders/admin.seeder';

export async function main() {
  try {
    await seedAdmin();
    process.exit(0);
  } catch (e) {
    console.error('Seed Error', JSON.stringify(e, null, 2));
    process.exit(1);
  }
}

void main();
