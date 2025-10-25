import React from "react";

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/placeholder.svg";

export function ImageWithFallback({ src, alt, fallbackSrc = DEFAULT_FALLBACK, onError, ...rest }: ImageWithFallbackProps) {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget;
    if (img.src !== (new URL(fallbackSrc, window.location.origin)).toString()) {
      img.onerror = null;
      img.src = fallbackSrc;
    }
    onError?.(e);
  };

  return <img src={src || fallbackSrc} alt={alt} onError={handleError} {...rest} />;
}

export default ImageWithFallback;
