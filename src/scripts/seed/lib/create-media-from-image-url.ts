import { faker } from '@faker-js/faker';
import { Payload } from 'payload';

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
  const res = await fetch(imageUrl);
  const arrBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrBuffer);

  const mimetype = res.headers.get('content-type') || 'image/jpeg';
  const filesize = buffer.length;
  const filename = res.url.split('/').pop()?.split('?')[0];

  try {
    if (!filename) throw new Error('Failed to extract filename from URL');
    return payload.create({
      collection: 'media',
      draft: true,
      data: {
        alt: faker.lorem.sentence(3),
      },
      file: {
        data: buffer,
        mimetype,
        size: filesize,
        name: filename,
      },
    });
  } catch (e) {
    console.warn('Failed to create media from image URL', { url: imageUrl, error: e });
  }
}
