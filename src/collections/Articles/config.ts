import type { CollectionConfig } from 'payload';
import { generateSlugHook } from './hooks/generate-slug.hook';
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { ARTICLE_STATUSES } from './constants';

export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [generateSlugHook],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'contentSummary',
      type: 'textarea',
      required: true,
      hooks: {
        beforeValidate: [generateContentSummaryHook],
      },
    },
    {
      name: 'readTimeInMinutes',
      type: 'number',
      defaultValue: 0,
      virtual: true,
      hooks: {
        afterRead: [
          ({ siblingData }) => {
            const text = convertLexicalToPlaintext({ data: siblingData?.content }).trim();
            const wordsPerMinute = 200;
            const words = text.trim().split(/\s+/).length;
            return Math.max(1, Math.ceil(words / wordsPerMinute));
          },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'article-authors',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: Object.values(ARTICLE_STATUSES),
      required: true,
      defaultValue: ARTICLE_STATUSES.DRAFT,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        condition: (data) => data.status === ARTICLE_STATUSES.PUBLISHED,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
};
