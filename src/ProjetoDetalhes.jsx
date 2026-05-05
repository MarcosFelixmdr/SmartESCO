import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './Projetos';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './styles.css';

const ProjetoDetalhes = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="projetos-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Projeto não encontrado.</h2>
        <Link to="/projetos" className="btn btn-primary" style={{ marginTop: '20px' }}>Voltar aos projetos</Link>
      </div>
    );
  }

  const details = {
    features: [
      "Integração em tempo real com hardware Edge AI",
      "Redução de custos operacionais comprovada de até 30%",
      "Dashboard analítico com machine learning",
      "Alta escalabilidade para redes industriais"
    ],
    results: [
      { metric: "+40%", label: "Eficiência" },
      { metric: "24/7", label: "Monitoramento" },
      { metric: "0", label: "Falhas Críticas" }
    ]
  };

  return (
    <div className="projeto-detalhes-page">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></div>
        <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></div>
        
        <div className="container relative z-20" style={{ position: 'relative', zIndex: 20, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <Link to="/projetos" style={{ display: 'inline-flex', alignItems: 'center', color: '#cbd5e1', textDecoration: 'none', marginBottom: '2rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'white'} onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Voltar aos Projetos
          </Link>
          <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase', marginLeft: '10px' }}>
            Estudo de Caso
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'white', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1, maxWidth: '800px' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#e2e8f0', maxWidth: '600px', lineHeight: 1.6 }}>
            {project.description}
          </p>
        </div>
      </section>

      <section className="section container" style={{ padding: '6rem 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-dark)' }}>O Desafio</h2>
            <p className="body-text" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              A complexidade das infraestruturas modernas exige soluções que vão além do monitoramento tradicional. Este projeto nasceu da necessidade de aplicar inteligência diretamente na borda (Edge) para tomadas de decisão ultra-rápidas, garantindo segurança e otimização de recursos energéticos sem depender 100% de conexões com a nuvem.
            </p>
            
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-dark)', marginTop: '3rem' }}>Principais Funcionalidades</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {details.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '1.05rem', color: 'var(--color-dark)', fontWeight: 500 }}>
                  <CheckCircle2 size={24} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ backgroundColor: 'var(--color-light)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>Resultados do Projeto</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {details.results.map((res, idx) => (
                  <div key={idx} style={{ textAlign: 'center', paddingBottom: idx !== details.results.length -1 ? '2rem' : '0', borderBottom: idx !== details.results.length -1 ? '1px solid var(--color-border)' : 'none' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{res.metric}</div>
                    <div style={{ fontSize: '1rem', color: 'var(--color-gray)', fontWeight: 600, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{res.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#0f172a', borderRadius: '1rem', color: 'white', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Gostaria de uma solução similar?</h3>
              <Link to="/contato" className="btn btn-primary" style={{ width: '100%', display: 'block', boxSizing: 'border-box' }}>
                Falar com Consultor
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ProjetoDetalhes;
