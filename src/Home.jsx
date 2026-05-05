import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Cpu, Network } from 'lucide-react';
import './styles.css';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-slide');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="new-hero">
        <div className="new-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580978556751-1b8c6e67a865')" }}></div>
        <div className="new-hero-overlay"></div>
        <div className="new-hero-gradient"></div>
        
        <div className="new-hero-content container animate-slide">
          <div className="new-hero-badge">
            <span className="ping-dot">
              <span className="ping-anim"></span>
              <span className="ping-core"></span>
            </span>
            <span className="badge-text">Inovação B2B</span>
          </div>
          
          <h1 className="new-hero-title">
            Soluções Avançadas em Eletrônica e Software para Energia
          </h1>
          <p className="new-hero-subtitle">
            Desenvolvemos infraestrutura inteligente com IoT, Edge AI e Smart Grids para otimizar operações no setor energético e industrial.
          </p>
          
          <Link to="/expertise">
            <button className="new-hero-btn group">
              Conheça Nossas Soluções
              <ArrowRight className="btn-icon" size={20} />
            </button>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            
            {/* Left Side: Text and List */}
            <div className="features-text animate-slide">
              <h2 className="features-title">Transformando dados em eficiência operacional</h2>
              <p className="features-desc">A SmartESCO atua na interseção entre hardware robusto e software inteligente. Nossa missão é modernizar a infraestrutura de energia através de tecnologias de ponta que garantem confiabilidade, segurança e otimização de recursos.</p>
              
              <ul className="features-list">
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  Hardware customizado para ambientes industriais
                </li>
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  Processamento de dados na borda (Edge AI)
                </li>
                <li>
                  <div className="icon-wrapper"><Zap size={14} /></div>
                  Integração perfeita com sistemas legados
                </li>
              </ul>
              
              <Link to="/projetos" className="features-link group">
                Ver nossos projetos <ArrowRight size={16} className="btn-icon" />
              </Link>
            </div>

            {/* Right Side: Cards Grid */}
            <div className="cards-grid animate-slide">
              <div className="cards-col mt-offset">
                <div className="feature-card dark-card">
                  <Cpu size={40} className="card-icon" />
                  <h3>Hardware</h3>
                  <p>Desenvolvimento de placas e sensores industriais.</p>
                </div>
                <div className="feature-card primary-card">
                  <Network size={40} className="card-icon-light" />
                  <h3>IoT & Edge</h3>
                  <p>Redes distribuídas e inteligência local.</p>
                </div>
              </div>
              <div className="cards-col">
                <div className="feature-card secondary-card">
                  <Zap size={40} className="card-icon" />
                  <h3>Smart Grids</h3>
                  <p>Gestão avançada de distribuição de energia.</p>
                </div>
                <div className="feature-card stat-card">
                  <h3>10+</h3>
                  <p>Anos de pesquisa e inovação aplicada.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

