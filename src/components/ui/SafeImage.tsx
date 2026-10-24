"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image that removes itself if the photo fails to load, revealing the
 * decorative .img-frame backdrop of its container instead of a broken icon.
 */
export function SafeImage({ alt, onError, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      alt={alt}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
