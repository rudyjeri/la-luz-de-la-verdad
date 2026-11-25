import { useMemo, useState } from 'react';
import './ShareStudy.css';

type ShareStudyProps = {
  title: string;
  url?: string;
  keyVerseRef?: string;
};

const ShareStudy = ({ title, url, keyVerseRef }: ShareStudyProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  }, [url]);

  const shareText = useMemo(() => {
    const verse = keyVerseRef ? ` (${keyVerseRef})` : '';
    return `Comparte este estudio: ${title}${verse}\n${shareUrl}`;
  }, [title, keyVerseRef, shareUrl]);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <aside className="share-study" aria-label="Compartir este estudio">
      <div className="share-study__text">
        <h3>Comparte este estudio</h3>
        <p>Envíalo a alguien que también necesite esta luz.</p>
      </div>
      <div className="share-study__actions">
        <a
          className="share-study__btn share-study__btn--wa"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          className="share-study__btn share-study__btn--fb"
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <button type="button" className="share-study__btn share-study__btn--copy" onClick={copyLink}>
          {copied ? '¡Copiado!' : 'Copiar enlace'}
        </button>
      </div>
    </aside>
  );
};

export default ShareStudy;
