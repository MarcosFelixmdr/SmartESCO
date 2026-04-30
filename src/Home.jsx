import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container animate-slide">
          <h1>Soluções em Engenharia Eletrônica</h1>
          <p>Desenvolvemos hardware e software para IoT, Edge AI e sistemas inteligentes em smart grids.</p>
          <div className="hero-btns">
            <Link to="/contato" className="btn btn-primary">Saiba mais</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="grid-2">
          <div className="animate-slide">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>
              SmartESCO: inovação em engenharia
            </h2>
            <p className="body-text">
              Desenvolvemos eletrônica customizada e software para aplicações em IoT, edge AI e smart grids.
              Trabalhamos em estreita colaboração com universidades como COPPE/UFRJ, 
              atendendo setores de energia, óleo e gás com tecnologia avançada.
            </p>
          </div>
          <div className="animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1224&h=424" 
              alt="Engenharia avançada" 
              className="img-rounded"
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#E3F2FD' }}>
        <div className="container">
          <h2 className="section-title">Nossos Serviços</h2>
          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="card animate-slide">
              <h3>Eletrônica Customizada</h3>
              <p>Desenvolvemos hardware sob medida para suas necessidades específicas, desde o protótipo até a escala industrial.</p>
              <img src="https://images.unsplash.com/photo-1522336957993-e51f1b25a720?auto=format&fit=crop&w=400&h=224" alt="Circuito impresso" className="img-rounded" style={{ marginTop: '20px' }} />
            </div>
            <div className="card animate-slide">
              <h3>Plataformas de Software</h3>
              <p>Criamos sistemas robustos para IoT, visão computacional e inteligência artificial de borda.</p>
              <img src="https://images.unsplash.com/photo-1603969409447-ba86143a03f6?auto=format&fit=crop&w=400&h=224" alt="Software" className="img-rounded" style={{ marginTop: '20px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="grid-2">
          <div className="animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1681949215173-fe0d15c790c1?auto=format&fit=crop&w=400&h=224" 
              alt="Pesquisa Acadêmica" 
              className="img-rounded"
            />
          </div>
          <div className="animate-slide">
            <h2>Parcerias Acadêmicas</h2>
            <p>Colaboramos com os principais centros de pesquisa do Brasil para trazer inovação de ponta aos nossos clientes.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Assine nossa Newsletter</h2>
          <p>Receba novidades sobre nossos projetos e inovações em primeira mão.</p>
          <div style={{ maxWidth: '500px', margin: '40px auto' }}>
            <div className="form-group">
              <input type="text" placeholder="Seu nome" className="form-input" />
            </div>
            <button className="btn" style={{ backgroundColor: '#000', color: '#fff', width: '100%', marginTop: '20px' }}>
              Enviar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
