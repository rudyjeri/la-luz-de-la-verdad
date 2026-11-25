import type { ImgHTMLAttributes } from 'react';

/** img con lazy-load y decoding async por defecto (excepto cuando loading="eager"). */
export default function LazyImg({
  loading = 'lazy',
  decoding = 'async',
  alt = '',
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} loading={loading} decoding={decoding} {...rest} />;
}
