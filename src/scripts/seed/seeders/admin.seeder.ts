import { getPayload } from 'payload';
import config from '@payload-config';
import { isDuplicateError } from '../lib/is-duplicate-error';
import { env } from '@/lib/env';
export async function seedAdmin() {
  const payload = await getPayload({
    config,
  });

  try {
    const response = await payload.create({
      collection: 'users',
      data: {
        email: env.CMS_SEED_ADMIN_EMAIL,
        password: env.CMS_SEED_ADMIN_PASSWORD,
      },
    });

    console.log('Admin user created ', response);
  } catch (e) {
    if (isDuplicateError(e, 'email')) {
      console.log('Admin user already exists, skipping creation');
    } else {
      console.error('Admin seed error', JSON.stringify(e, null, 2));
    }
  }
}
