export const FIREBASE_ID_TOKEN_KEY = 'firebase-id-token'
export const BUCKET_NAME = 'tokyo1r.appspot.com';

export default function fullUrl(filepath: string) {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${filepath}`;
}
