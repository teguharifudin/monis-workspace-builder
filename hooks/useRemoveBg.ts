"use client";

import { useEffect, useState } from "react";

// Cache agar gambar yang sama tidak diproses ulang
const cache = new Map<string, string>();

export function useRemoveBg(src: string, threshold = 238) {
  const [dataUrl, setDataUrl] = useState<string>(src);

  useEffect(() => {
    if (!src) return;
    if (cache.has(src)) { setDataUrl(cache.get(src)!); return; }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] >= threshold && d[i+1] >= threshold && d[i+2] >= threshold) {
          d[i+3] = 0; // transparan
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const result = canvas.toDataURL("image/png");
      cache.set(src, result);
      setDataUrl(result);
    };
    img.onerror = () => setDataUrl(src);
    img.src = src;
  }, [src, threshold]);

  return dataUrl;
}
