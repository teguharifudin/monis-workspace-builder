"use client";

import { useRemoveBg } from "@/hooks/useRemoveBg";

interface TransparentImgProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentImg({ src, alt, className = "w-full h-auto block" }: TransparentImgProps) {
  const processedSrc = useRemoveBg(src);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={processedSrc} alt={alt} className={className} />;
}
