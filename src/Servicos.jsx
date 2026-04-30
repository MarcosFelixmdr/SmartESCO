import React from 'react';
import './styles.css';

const Servicos = () => {
  return (
    <div className="servicos-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>Nossos Serviços</h1>
          <p>Desenvolvemos soluções em eletrônica e software para setores críticos.</p>
        </div>
      </section>

      <section className="section container">
        <div className="grid-3">
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1701367976949-269effa0c323?auto=format&fit=crop&w=400&h=280" 
              alt="Eletrônica" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>Eletrônica</h3>
            <p>Projetos customizados de hardware para IoT, Edge AI e smart grids.</p>
          </div>
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1671726805768-93b4c260766b?auto=format&fit=crop&w=400&h=280" 
              alt="Software" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>Software</h3>
            <p>Plataformas robustas para visão computacional e inteligência artificial.</p>
          </div>
          <div className="card animate-slide">
            <img 
              src="https://images.unsplash.com/photo-1531837404483-bdbd0d209ec1?auto=format&fit=crop&w=400&h=280" 
              alt="Parcerias" 
              className="img-rounded"
              style={{ marginBottom: '20px' }}
            />
            <h3>Parcerias</h3>
            <p>Aplicações em HPC, robótica e sistemas para energia e óleo&gás.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Dúvidas Frequentes</h2>
          <div className="faq-section">
            <div className="faq-item animate-slide">
              <h6>Quais serviços oferecemos?</h6>
              <p>Desenvolvemos eletrônica customizada e software para edge AI e IoT.</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>Com quem trabalhamos?</h6>
              <p>Atendemos empresas dos setores elétrico, energia e óleo & gás, com parcerias acadêmicas.</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>Quais tecnologias utilizamos?</h6>
              <p>Aplicamos IoT, edge AI, smart grid, HPC, robótica, visão computacional e IA em nossos projetos.</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>Como funciona a parceria acadêmica?</h6>
              <p>Nossa equipe colabora com laboratórios da Coppe/UFRJ, UFF, USP e UERJ.</p>
            </div>
            <div className="faq-item animate-slide">
              <h6>Qual o diferencial da SmartESCO?</h6>
              <p>Unimos expertise em hardware e software para soluções sob medida e inovadoras.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
