import slugifyUrl from '@/lib/slugify';
import { Article } from '@/payload-types';
import { FieldHook } from 'payload';

export const generateSlugHook: FieldHook<Article, string> = ({ value, data }) => {
  if (value) {
    return slugifyUrl(value.trim()) || '';
  }

  return slugifyUrl(data?.title?.trim() || '') || '';
};
