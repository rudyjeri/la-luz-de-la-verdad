/** Comprime una imagen en el navegador antes de subirla (máx. 1600px, JPEG ~0.8). */
export async function compressImageFile(
  file: File,
  opts: { maxEdge?: number; quality?: number } = {},
): Promise<File> {
  const maxEdge = opts.maxEdge ?? 1600;
  const quality = opts.quality ?? 0.8;

  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen');
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('No se pudo procesar la imagen');
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', quality),
  );
  if (!blob) {
    throw new Error('No se pudo comprimir la imagen');
  }

  const base = file.name.replace(/\.[^.]+$/, '') || 'imagen';
  return new File([blob], `${base}.jpg`, { type: 'image/jpeg' });
}
