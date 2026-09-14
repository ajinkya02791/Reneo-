import { useEffect, useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

const FALLBACK_IMAGE = "/src/assets/product-placeholder.png";

export default function ProductImage({
  src,
  alt,
  className,
}: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImageSrc(FALLBACK_IMAGE);
      }}
    />
  );
}