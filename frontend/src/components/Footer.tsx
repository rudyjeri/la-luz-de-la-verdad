import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <hr className="footer__divider" />
        <nav className="footer__nav-links" aria-label="Enlaces principales">
          <ul className="footer__nav-list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/fe-y-ciencia">Fe y Ciencia</Link></li>
            <li><Link to="/doctrinas">Doctrinas</Link></li>
            <li><Link to="/profecias">Profecías</Link></li>
          </ul>
        </nav>
        <hr className="footer__divider" />

        <div className="footer__middle">
          <div className="footer__branding">
            <img src="/images/logo.png" alt="Logo La Luz de la Verdad" className="footer__logo" />
          </div>

          <div className="footer__subscribe">
            <h3 className="footer__heading">Suscríbete a nuestro boletín mensual</h3>
            <p className="footer__text">Recibe las últimas noticias</p>
            <form action="https://formsubmit.co/tucorreo@ejemplo.com" method="POST" className="footer__form">
              <input type="email" name="email" placeholder="Tu correo electrónico" required className="footer__input" />
              <button type="submit" className="footer__submit">Suscribirse</button>
            </form>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__social" role="navigation" aria-label="Redes sociales">
            <a href="https://www.facebook.com/tupagina" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="footer__social-img" />
            </a>
            <a href="https://www.youtube.com/tucanal" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" className="footer__social-img" />
            </a>
            <a href="https://www.instagram.com/tucuenta" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="footer__social-img" />
            </a>
          </div>
          <p className="footer__copyright">
            © 2025 – Todos los derechos reservados | La Luz de la Verdad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
