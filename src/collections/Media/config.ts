import type { CollectionConfig } from 'payload';
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './lib/generate-blur-data-urls';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataUrl',
      type: 'text',
      required: true,
      admin: { hidden: true },
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation !== 'create') return data;

        if (!isEligibleForBlurDataUrl(req.file?.mimetype)) return data;

        const base64 = await generateBlurDataUrl(req.file?.data);

        if (!base64) return data;
        data.blurDataUrl = base64;

        console.log('Generated blurDataUrl for ', data.filename);
        return data;
      },
    ],
  },
};
