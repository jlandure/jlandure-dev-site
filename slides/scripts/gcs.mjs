export const GCS_PROJECT = "jlandure-dev-slides";
export const GCS_BUCKET = "jlandure-dev-slides";
export const GCS_OBJECT_PREFIX = "slides";

export function gcsObjectUrl(slug) {
  return `https://storage.googleapis.com/${GCS_BUCKET}/${GCS_OBJECT_PREFIX}/${slug}/deck.pdf`;
}

export function gcsObjectUri(slug) {
  return `gs://${GCS_BUCKET}/${GCS_OBJECT_PREFIX}/${slug}/deck.pdf`;
}
