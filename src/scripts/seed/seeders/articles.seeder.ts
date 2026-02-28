import { faker } from '@faker-js/faker';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import { Payload } from 'payload';
import config from '@/payload.config';
import { ARTICLE_STATUSES, MAX_SUMMARY_LENGTH } from '@/collections/Articles/constants';
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url';
import { slugify } from 'payload/shared';
import slugifyUrl from '@/lib/slugify';

const ARTICLES_COUNT = 5;

export async function seedArticles(payload: Payload) {
  let successCount = 0;
  for (let i = 0; i < ARTICLES_COUNT; i++) {
    try {
      const imageUrl = faker.image.urlPicsumPhotos();
      const image = await createMediaFromImageUrl(payload, imageUrl);

      if (!image) {
        console.warn('Failed to create media for article cover image, skipping article creation', {
          image: imageUrl,
        });
        return;
      }

      const status = faker.helpers.arrayElement(Object.values(ARTICLE_STATUSES));

      const title = faker.lorem.sentence();
      const slug = slugifyUrl(title);
      const content = faker.lorem.paragraphs(5);
      const contentLexical = convertMarkdownToLexical({
        markdown: content,
        editorConfig: await editorConfigFactory.default({ config: await config }),
      });

      await payload.create({
        collection: 'articles',
        data: {
          title,
          slug,
          content: contentLexical,
          contentSummary: `${content.slice(0, MAX_SUMMARY_LENGTH - 3)}...`,
          author: 1,
          coverImage: image.id,
          status,
          ...(status === ARTICLE_STATUSES.PUBLISHED && {
            publishedAt: faker.date.recent() as unknown as string,
          }),
        },
        draft: true,
      });
      successCount++;
    } catch (e) {
      console.error('Failed to seed article', { error: e });
    }
  }
}
