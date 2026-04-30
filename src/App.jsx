import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Home";
import Servicos from "./Servicos";
import Projetos from "./Projetos";
import Contato from "./Contato";
import AnaliseConsumo from "./AnaliseConsumo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/analise" element={<AnaliseConsumo />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

