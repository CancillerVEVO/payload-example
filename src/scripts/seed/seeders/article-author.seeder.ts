import { Payload } from 'payload';
import { faker } from '@faker-js/faker';
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from '@/collections/ArticleAuthors/constants';
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url';

export async function seedArticleAuthor(payload: Payload) {
  try {
    const imageUrl = faker.image.personPortrait({ size: 256 });
    const image = await createMediaFromImageUrl(payload, imageUrl);

    if (!image) {
      console.warn('Failed to create media for article author, skipping author creation', {
        image: imageUrl,
      });
      return;
    }

    await payload.create({
      collection: 'article-authors',
      data: {
        name: faker.person.fullName(),
        role: ARTICLE_AUTHOR_ROLE_OPTIONS.STAFF_WRITER,
        avatar: image.id,
      },
    });
  } catch (e) {
    console.warn('Failed to seed article author', { error: e });
  }
}
