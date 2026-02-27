import { getPlaiceholder } from 'plaiceholder';

export function isEligibleForBlurDataUrl(mime?: string | null) {
  if (!mime?.startsWith('image/')) return false;
  if (mime === 'image/svg+xml') return false;

  return true;
}

export async function generateBlurDataUrl(
  buffer?: Buffer<ArrayBufferLike>,
): Promise<string | null> {
  if (!buffer) {
    console.warn('No buffer provided for generating blurDataUrl');
    return null;
  }

  const { base64 } = await getPlaiceholder(buffer);
  if (!base64) return null;

  return base64;
}
