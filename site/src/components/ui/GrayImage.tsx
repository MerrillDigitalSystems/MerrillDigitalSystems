import Image from "next/image";

/**
 * Every content photograph goes through this wrapper. Grayscale is applied in
 * CSS, never baked into the file, so the source stays reusable.
 */
export function GrayImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  imgClassName = "",
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
}) {
  return (
    <div className={`grayscale-photo overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={imgClassName}
      />
    </div>
  );
}
