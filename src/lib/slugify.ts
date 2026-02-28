import { slugify } from 'payload/shared';

export default function slugifyUrl(text: string) {
  try {
    return slugify(text);
  } catch (e) {
    console.error('Error slugifying text', { text, error: e });
  }
}
