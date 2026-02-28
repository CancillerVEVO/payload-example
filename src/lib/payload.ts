import { getPayload, Payload } from 'payload';
import config from '@payload-config';

let payload: Payload | null = null;

export const getPayloadInstance = async () => {
  if (!payload) {
    payload = await getPayload({
      config,
    });
  }
  return payload;
};
