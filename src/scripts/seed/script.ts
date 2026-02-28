import { getPayloadInstance } from '@/lib/payload';
import { seedAdmin } from './seeders/admin.seeder';
import { seedArticleAuthor } from './seeders/article-author.seeder';
import { seedArticles } from './seeders/articles.seeder';

export async function main() {
  const payload = await getPayloadInstance();
  try {
    await seedAdmin(payload);
    await seedArticleAuthor(payload);
    await seedArticles(payload);
    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (e) {
    console.error('Seed Error', JSON.stringify(e, null, 2));
    process.exit(1);
  }
}

void main();
