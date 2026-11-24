import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctrinas from './pages/Doctrinas';
import FeYCiencia from './pages/FeYCiencia';
import Profecias from './pages/Profecias';
import Recursos from './pages/Recursos';
import ArticleReader from './pages/ArticleReader';

// Subpáginas
import CreacionEvolucion from './pages/subpages/CreacionEvolucion';
import EvidenciasDiluvio from './pages/subpages/EvidenciasDiluvio';
import BibliaDinosaurios from './pages/subpages/BibliaDinosaurios';
import JustificacionFe from './pages/subpages/JustificacionFe';
import HistoricidadBiblia from './pages/subpages/HistoricidadBiblia';
import Santuario from './pages/subpages/Santuario';
import ReformaProsalud from './pages/subpages/ReformaProsalud';
import ProfeciasDaniel from './pages/subpages/ProfeciasDaniel';
import EventosFinales from './pages/subpages/EventosFinales';
import Deidad from './pages/subpages/Deidad';
import LeyDeDios from './pages/subpages/LeyDeDios';
import EstadoMuertos from './pages/subpages/EstadoMuertos';
import EspirituProfecia from './pages/subpages/EspirituProfecia';
import ProfeciasApocalipsis from './pages/subpages/ProfeciasApocalipsis';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctrinas" element={<Doctrinas />} />
            <Route path="/fe-y-ciencia" element={<FeYCiencia />} />
            <Route path="/articulo/:slug" element={<ArticleReader />} />
            <Route path="/profecias" element={<Profecias />} />
            <Route path="/recursos" element={<Recursos />} />

            {/* Rutas de Fe y Ciencia */}
            <Route path="/creacion-evolucion" element={<CreacionEvolucion />} />
            <Route path="/evidencias-diluvio" element={<EvidenciasDiluvio />} />
            <Route path="/biblia-dinosaurios" element={<BibliaDinosaurios />} />
            <Route path="/historicidad-biblia" element={<HistoricidadBiblia />} />

            {/* Rutas de Doctrinas */}
            <Route path="/justificacion-fe" element={<JustificacionFe />} />
            <Route path="/deidad" element={<Deidad />} />
            <Route path="/ley-de-dios" element={<LeyDeDios />} />
            <Route path="/estado-muertos" element={<EstadoMuertos />} />
            <Route path="/santuario" element={<Santuario />} />
            <Route path="/reforma-prosalud" element={<ReformaProsalud />} />
            <Route path="/espiritu-profecia" element={<EspirituProfecia />} />
            
            {/* Rutas de Profecías */}
            <Route path="/profecias-daniel" element={<ProfeciasDaniel />} />
            <Route path="/profecias-apocalipsis" element={<ProfeciasApocalipsis />} />
            <Route path="/eventos-finales" element={<EventosFinales />} />
            
            {/* Agregaremos más rutas aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
