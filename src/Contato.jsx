import React from 'react';
import './styles.css';

const Contato = () => {
  return (
    <div className="contato-page">
      <section className="hero">
        <div className="container animate-slide">
          <h1>Contato</h1>
          <p>Fale conosco para projetos de eletrônica customizada, Edge AI e parcerias acadêmicas.</p>
        </div>
      </section>

      <section className="section container">
        <div className="contact-grid">

          <div className="animate-slide">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '40px' }}>
              Localização e Inovação
            </h2>
            <p className="body-text" style={{ marginBottom: '40px' }}>
              Estamos localizados em Petrópolis, na região serrana do Rio de Janeiro, 
              um importante polo de inovação e tecnologia. Nossa sede nos permite 
              desenvolver soluções inteligentes com foco em excelência e agilidade.
            </p>

            <div className="contact-info-item">
              <h4>Endereço</h4>
              <p>Rua Domingos Silvério, 135, Quitandinha, Petrópolis - RJ, CEP 25650-050</p>
            </div>

            <div className="contact-info-item">
              <h4>Horário de Atendimento</h4>
              <p>Segunda a Sexta: 08:00 - 18:00</p>
            </div>

            <div className="contact-info-item">
              <h4>Email e Telefone</h4>
              <p>contato@SmartESCO.com.br</p>
              <p>+55 21 99551-9674</p>
            </div>
          </div>

          <div className="card animate-slide">
            <h3 style={{ marginBottom: '30px' }}>Envie uma Mensagem</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Seu nome</label>
                <input type="text" placeholder="Digite seu nome" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Seu e-mail</label>
                <input type="email" placeholder="Digite seu e-mail" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Mensagem</label>
                <textarea 
                  placeholder="Escreva sua mensagem" 
                  className="form-input" 
                  style={{ minHeight: '150px', resize: 'vertical' }}
                ></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: '100px' }}>
        <div className="container">
          <div className="map-container animate-slide">
            <iframe 
              src="https://www.google.com/maps?q=Rua+Domingos+Silv%C3%A9rio,+135,+Quitandinha,+Petr%C3%B3polis+-+RJ,+CEP+25650-050&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
