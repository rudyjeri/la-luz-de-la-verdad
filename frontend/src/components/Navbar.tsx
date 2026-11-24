import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__logo">
        <Link to="/" onClick={closeMenu}>
          <img 
            src="/images/la-luz-de-la-verdad-high-resolution-logo-transparent (23).png" 
            alt="La Luz de la Verdad" 
            className="nav__logo-img" 
          />
        </Link>
      </div>

      <ul className={`nav__link nav__link--menu ${isOpen ? 'nav__link--show' : ''}`}>
        <button className="nav__close" onClick={closeMenu}>✕</button>

        <li className="nav__items">
          <Link to="/" className="nav__links" onClick={closeMenu}>Inicio</Link>
        </li>

        <li className={`nav__items nav__dropdown ${activeDropdown === 'ciencia' ? 'active' : ''}`}>
          <Link to="/fe-y-ciencia" className="nav__links" onClick={(e) => toggleDropdown('ciencia', e)}>
            Fe y Ciencia <span>▼</span>
          </Link>
          <ul className="nav__submenu">
            <li><Link to="/creacion-evolucion" onClick={closeMenu}>¿Creación o Evolución?</Link></li>
            <li><Link to="/evidencias-diluvio" onClick={closeMenu}>Evidencias del Diluvio</Link></li>
            <li><Link to="/biblia-dinosaurios" onClick={closeMenu}>La Biblia y los Dinosaurios</Link></li>
            <li><Link to="/historicidad-biblia" onClick={closeMenu}>La Historicidad de la Biblia</Link></li>
          </ul>
        </li>

        <li className={`nav__items nav__dropdown ${activeDropdown === 'doctrinas' ? 'active' : ''}`}>
          <Link to="/doctrinas" className="nav__links" onClick={(e) => toggleDropdown('doctrinas', e)}>
            Doctrinas <span>▼</span>
          </Link>
          <ul className="nav__submenu">
            <li><Link to="/justificacion-fe" onClick={closeMenu}>Justificación por la Fe</Link></li>
            <li><Link to="/deidad" onClick={closeMenu}>La Deidad</Link></li>
            <li><Link to="/ley-de-dios" onClick={closeMenu}>La Ley de Dios</Link></li>
            <li><Link to="/estado-muertos" onClick={closeMenu}>El Estado de los Muertos</Link></li>
            <li><Link to="/santuario" onClick={closeMenu}>El Santuario</Link></li>
            <li><Link to="/reforma-prosalud" onClick={closeMenu}>Reforma Prosalud</Link></li>
            <li><Link to="/espiritu-profecia" onClick={closeMenu}>El Espíritu de Profecía</Link></li>
          </ul>
        </li>

        <li className={`nav__items nav__dropdown ${activeDropdown === 'profecias' ? 'active' : ''}`}>
          <Link to="/profecias" className="nav__links" onClick={(e) => toggleDropdown('profecias', e)}>
            Profecías <span>▼</span>
          </Link>
          <ul className="nav__submenu">
            <li><Link to="/profecias-daniel" onClick={closeMenu}>Profecías de Daniel</Link></li>
            <li><Link to="/profecias-apocalipsis" onClick={closeMenu}>Profecías del Apocalipsis</Link></li>
            <li><Link to="/eventos-finales" onClick={closeMenu}>Los Eventos Finales</Link></li>
          </ul>
        </li>

        <li className="nav__items">
          <Link to="/recursos" className="nav__links" onClick={closeMenu}>Recursos</Link>
        </li>
      </ul>

      <button className="nav__menu" onClick={toggleMenu} aria-label="Abrir menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
