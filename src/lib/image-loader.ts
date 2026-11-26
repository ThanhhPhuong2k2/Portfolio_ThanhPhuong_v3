import type { ImageLoaderProps } from "next/image";

/** `…/image/upload/` + any transformations already in the src (a crop) + the rest (`v123/file`). */
const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)((?:[^/]+\/)*?)(v\d+\/.+)$/;

/**
 * next/image loader for the static export.
 * - Cloudinary: appends `f_auto,q_auto,w_<width>` after any transformation the src already has
 *   (a crop runs first, then the resize), before the version (verified on all three accounts).
 * - framerusercontent.com: sets `scale-down-to=<width>` (verified).
 * - Any other host is served as-is (no resizing available).
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const cloudinary = CLOUDINARY_UPLOAD.exec(src);
  if (cloudinary) {
    const [, base, existing, rest] = cloudinary;
    const q = quality ? `q_${quality}` : "q_auto";
    return `${base}${existing}f_auto,${q},w_${width}/${rest}`;
  }

  if (src.startsWith("https://framerusercontent.com/")) {
    const url = new URL(src);
    url.searchParams.set("scale-down-to", String(width));
    return url.toString();
  }

  return src;
}
