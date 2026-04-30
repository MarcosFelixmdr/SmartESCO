import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header" style={{ padding: '0 40px' }}>
      <div className="logo">
        <Link to="/">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/5r95KcsqHcQGnCYw/logo-tecnoclade-nmHuqKicKFXRFEFL.png"
            alt="SmartESCO Logo"
            style={{ height: '60px' }}
          />
        </Link>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/servicos"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projetos"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Projetos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analise"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Painel de Análise
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contato"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contato
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
