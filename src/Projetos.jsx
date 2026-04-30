import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const projects = [
  {
    id: 1,
    title: "Monitoramento Smart Grid",
    description: "Sistema avançado de monitoramento para redes elétricas inteligentes, utilizando IoT para coleta de dados em tempo real e análise preditiva.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Visão Computacional Edge AI",
    description: "Algoritmos de IA de borda implementados em hardware customizado para detecção automática de anomalias em infraestruturas industriais.",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Sistemas de Automação IoT",
    description: "Desenvolvimento de dispositivos de controle sem fio para automação de processos em ambientes de óleo e gás, com alta resiliência.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  }
];

const Projetos = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <div className="projetos-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>Nossos Projetos</h1>
          <p>Confira algumas das soluções inovadoras que desenvolvemos para nossos parceiros e clientes.</p>
        </div>
      </section>

      <section className="section container">
        <div className="carousel animate-slide">
          <div 
            className="carousel-inner" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="carousel-item">
                <div className="carousel-card">
                  <div 
                    className="carousel-image" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="carousel-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevSlide}>
              &#10094;
            </button>
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <div 
                  key={index} 
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                ></div>
              ))}
            </div>
            <button className="carousel-btn" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>
      </section>

      <section className="section container" style={{ textAlign: 'center', backgroundColor: '#e3f2fd', borderRadius: '30px', marginBottom: '100px' }}>
        <h2 style={{ marginBottom: '20px' }}>Tem um projeto em mente?</h2>
        <p style={{ marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Unimos hardware e software para tirar sua ideia do papel. Vamos conversar sobre como podemos ajudar sua empresa.
        </p>
        <Link to="/contato" className="btn btn-primary">Faça um Orçamento</Link>
      </section>
    </div>
  );
};

export default Projetos;
