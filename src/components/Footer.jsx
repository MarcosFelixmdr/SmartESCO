import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="contato">
      <div className="container footer-grid">
        <div>
          <h3>SmartESCO</h3>
          <p style={{ marginTop: '20px', color: '#ccc' }}>
            Engenharia eletrônica e software para o futuro da indústria.
          </p>
        </div>
        <div>
          <h4>Contato</h4>
          <p style={{ marginTop: '10px' }}>Email: contato@SmartESCO.com.br</p>
          <p>Telefone: +55 21 99551-9674</p>
        </div>
        <div>
          <h4>Redes Sociais</h4>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', fontSize: '14px', color: '#888' }}>
        <p>© 2025 SmartESCO. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
