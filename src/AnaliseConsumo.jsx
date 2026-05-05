import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell, LineChart, Line, Legend
} from 'recharts';
import {
  Zap, TrendingUp, TrendingDown, Activity, AlertTriangle, BarChart3, PieChart as PieChartIcon, Target, DollarSign, Brain, Thermometer, Calendar
} from 'lucide-react';
import {
  calculateMetrics, detectPeaks, classifyProfile, generateMockData,
  generateHourlyMockData, simulateTariffCosts, calculateEfficiencyIndicators, generateLoadData,
  generateForecast, generateClimateData, calculateCorrelation, generateAlerts, generateInsights
} from './utils/energyAnalysis';
import './styles.css';

const PROFILE_COLORS = {
  'Estável': '#10b981',
  'Sazonal': '#f59e0b',
  'Irregular': '#ef4444',
  'Sem dados': '#6b7280',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="analysis-tooltip">
        <p className="analysis-tooltip-label">{label}</p>
        <p className="analysis-tooltip-value">{payload[0].value} kWh</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipMoney = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="analysis-tooltip">
        <p className="analysis-tooltip-label">{label}</p>
        <p className="analysis-tooltip-value">R$ {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const UC_LIST = [
  { id: 'UC-001', name: 'Matriz Principal - São Paulo (Estável)', profile: 'estavel' },
  { id: 'UC-002', name: 'Galpão Logístico - Cajamar (Irregular)', profile: 'irregular' },
  { id: 'UC-003', name: 'Loja Shopping - Morumbi (Sazonal)', profile: 'sazonal' },
];

const AnaliseConsumo = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const [selectedUc, setSelectedUc] = useState(UC_LIST[0]);

  const mockData = useMemo(() => generateMockData(selectedUc.id, selectedUc.profile), [selectedUc]);
  const values = mockData.dados.map(d => d.consumo);
  const metrics = useMemo(() => calculateMetrics(values), [values]);
  const peaks = useMemo(() => detectPeaks(mockData.dados), [mockData.dados]);
  const profile = useMemo(() => classifyProfile(values), [values]);

  const hourlyData = useMemo(() => generateHourlyMockData(), []);
  const tariffCosts = useMemo(() => simulateTariffCosts(hourlyData), [hourlyData]);

  const efficiency = useMemo(() => calculateEfficiencyIndicators(values), [values]);
  const loadData = useMemo(() => generateLoadData(metrics.total), [metrics.total]);

  const forecastData = useMemo(() => generateForecast(mockData.dados, 4), [mockData.dados]);
  const climateData = useMemo(() => generateClimateData(mockData.dados), [mockData.dados]);
  const corrTemp = useMemo(() => {
    const consumos = climateData.map(d => d.consumo);
    const temps = climateData.map(d => d.temp);
    return calculateCorrelation(consumos, temps);
  }, [climateData]);

  const fullSeries = useMemo(() => [
    ...mockData.dados.map(d => ({ ...d, isForecast: false })),
    ...forecastData
  ], [mockData.dados, forecastData]);
  const forecastedCost = useMemo(() => {
    const avgForecast = forecastData.reduce((a, b) => a + b.consumo, 0) / forecastData.length;
    return Math.round(avgForecast * 0.72 * 30 * 100) / 100; // tarifa convencional x dias
  }, [forecastData]);
  const hasPeakRisk = forecastData.some(d => d.consumo > metrics.maximo * 0.9);

  const alerts = useMemo(() => generateAlerts({ metrics, efficiency, peaks, forecastData }), [metrics, efficiency, peaks, forecastData]);
  const insights = useMemo(() => generateInsights({ tariffCosts, loadData, profile }), [tariffCosts, loadData, profile]);

  const peakLabels = new Set(peaks.map(p => p.label));
  const profileColor = PROFILE_COLORS[profile.perfil] || '#6b7280';

  const tariffComparisonData = [
    { name: 'Tarifa Convencional', custo: tariffCosts.convencional, fill: '#ef4444' },
    { name: 'Tarifa Branca', custo: tariffCosts.branca, fill: '#10b981' },
  ];

  const renderTabs = () => (
    <div className="analysis-tabs animate-slide">
      {[
        { id: 'geral', label: 'Visão Geral', icon: <Activity size={18} /> },
        { id: 'tarifas', label: 'Otimização Tarifária', icon: <DollarSign size={18} /> },
        { id: 'cargas', label: 'Análise de Cargas', icon: <PieChartIcon size={18} /> },
        { id: 'eficiencia', label: 'Eficiência', icon: <Target size={18} /> },
        { id: 'previsao', label: 'Previsão & IA', icon: <Brain size={18} /> },
      ].map(tab => (
        <button
          key={tab.id}
          className={`analysis-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="analise-page">
      <section className="hero" style={{ minHeight: 'auto', padding: '60px 0 40px' }}>
        <div className="container animate-slide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1>Workspace de Gestão</h1>
              <p>Módulo de Inteligência, Otimização de Custos e Alertas.</p>
            </div>

            <div className="uc-selector-wrapper">
              <label style={{ color: '#fff', display: 'block', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 'bold' }}>Unidade Consumidora (UC):</label>
              <select
                className="uc-selector"
                value={selectedUc.id}
                onChange={(e) => setSelectedUc(UC_LIST.find(uc => uc.id === e.target.value))}
              >
                {UC_LIST.map(uc => (
                  <option key={uc.id} value={uc.id}>🏢 {uc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: '0' }}>

        <div className="system-notifications animate-slide">
          {alerts.map(al => (
            <div key={al.id} className={`system-alert alert-${al.level}`}>
              <AlertTriangle size={24} />
              <div style={{ flex: 1 }}>
                <strong>{al.title}</strong>
                <p>{al.message}</p>
                <span className="alert-suggestion">💡 Ação Recomendada: {al.suggestion}</span>
              </div>
            </div>
          ))}
          {insights.map(id => (
            <div key={id.id} className="system-insight">
              <Zap size={24} color="#f59e0b" />
              <div style={{ flex: 1 }}>
                <strong>{id.title}</strong>
                <p>{id.message}</p>
              </div>
              <button className="insight-action-btn">{id.action}</button>
            </div>
          ))}
        </div>

        {renderTabs()}

        {activeTab === 'geral' && (
          <div className="tab-content animate-slide">
            <div className="analysis-metrics-grid">
              <div className="analysis-metric-card">
                <div className="analysis-metric-icon" style={{ backgroundColor: '#d1fae5' }}>
                  <Zap size={22} color="#059669" />
                </div>
                <div>
                  <span className="analysis-metric-value">{metrics.media}</span>
                  <span className="analysis-metric-label">Média Global (kWh)</span>
                </div>
              </div>
              <div className="analysis-metric-card">
                <div className="analysis-metric-icon" style={{ backgroundColor: '#fce7f3' }}>
                  <TrendingUp size={22} color="#db2777" />
                </div>
                <div>
                  <span className="analysis-metric-value">{metrics.maximo}</span>
                  <span className="analysis-metric-label">Pico Máximo (kWh)</span>
                </div>
              </div>
            </div>

            <div className="analysis-chart-card">
              <div className="analysis-chart-header">
                <h3>Consumo Histórico Anual</h3>
                <span className="analysis-uc-badge">UC: {mockData.ucId}</span>
              </div>
              <div className="analysis-chart-body">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData.dados} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" tick={{ fontSize: 13 }} />
                    <YAxis tick={{ fontSize: 13 }} unit=" kWh" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={metrics.media}
                      stroke="#f59e0b"
                      strokeDasharray="6 4"
                      label={{ value: `Média: ${metrics.media}`, position: 'insideTopRight', fill: '#f59e0b', fontSize: 12 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="consumo"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorConsumo)"
                      dot={(props) => {
                        const isPeak = peakLabels.has(props.payload.label);
                        return (
                          <circle
                            key={props.key}
                            cx={props.cx}
                            cy={props.cy}
                            r={isPeak ? 6 : 3}
                            fill={isPeak ? '#ef4444' : '#2563eb'}
                            stroke={isPeak ? '#fff' : 'none'}
                            strokeWidth={isPeak ? 2 : 0}
                          />
                        );
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tarifas' && (
          <div className="tab-content animate-slide">
            <div className="grid-2">
              <div className="analysis-insight-card" style={{ marginBottom: 0 }}>
                <div className="analysis-insight-header">
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={24} color="#10b981" /> Simulação Tarifária
                  </h3>
                </div>
                <p className="body-text mb-4">
                  Comparação de custos estimados para um dia útil típico da sua UC baseada no consumo horário.
                </p>

                <div className="analysis-insight-summary">
                  <div className="analysis-insight-item">
                    <span>Melhor Opção</span>
                    <strong style={{ color: tariffCosts.melhor === 'Tarifa Branca' ? '#10b981' : '#2563eb' }}>
                      {tariffCosts.melhor}
                    </strong>
                  </div>
                  <div className="analysis-insight-item">
                    <span>Economia (Dia útil)</span>
                    <strong style={{ color: tariffCosts.economia > 0 ? '#10b981' : '#ef4444' }}>
                      R$ {Math.abs(tariffCosts.economia)} ({tariffCosts.percentualEconomia}%)
                    </strong>
                  </div>
                </div>
              </div>

              <div className="analysis-chart-card" style={{ marginBottom: 0 }}>
                <div className="analysis-chart-header">
                  <h3>Comparativo de Custos Estimados (R$)</h3>
                </div>
                <div className="analysis-chart-body" style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tariffComparisonData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" unit=" R$" />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fontWeight: 600 }} />
                      <Tooltip content={<CustomTooltipMoney />} />
                      <Bar dataKey="custo" radius={[0, 6, 6, 0]} barSize={40}>
                        {tariffComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="analysis-chart-card" style={{ marginTop: '30px' }}>
              <div className="analysis-chart-header">
                <h3>Perfil de Consumo Horário (Dia Útil)</h3>
              </div>
              <div className="analysis-chart-body">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 13 }} />
                    <YAxis tick={{ fontSize: 13 }} unit=" kWh" />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x="18h" stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Início Ponta', position: 'insideTopLeft', fill: '#ef4444', fontSize: 11 }} />
                    <ReferenceLine x="21h" stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Fim Ponta', position: 'insideTopRight', fill: '#ef4444', fontSize: 11 }} />

                    <Line type="monotone" dataKey="consumo" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cargas' && (
          <div className="tab-content animate-slide">
            <div className="grid-2">
              <div className="analysis-chart-card" style={{ marginBottom: 0 }}>
                <div className="analysis-chart-header">
                  <h3>Distribuição por Carga</h3>
                </div>
                <div className="analysis-chart-body" style={{ display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={loadData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {loadData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} kWh`} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="analysis-insight-card" style={{ marginBottom: 0 }}>
                <div className="analysis-insight-header">
                  <h3>Ranking de Consumidores</h3>
                </div>
                <div className="load-ranking-list">
                  {loadData.map((item, index) => (
                    <div key={index} className="load-ranking-item">
                      <div className="load-ranking-info">
                        <span className="load-ranking-pos">#{index + 1}</span>
                        <div className="load-ranking-color" style={{ backgroundColor: item.color }}></div>
                        <span className="load-ranking-name">{item.name}</span>
                      </div>
                      <div className="load-ranking-value">
                        <strong>{item.value}</strong> <small>kWh</small>
                        <span className="load-ranking-pct">({Math.round((item.value / metrics.total) * 100)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eficiencia' && (
          <div className="tab-content animate-slide">
            <div className="analysis-insight-card">
              <div className="analysis-insight-header">
                <div
                  className="analysis-profile-badge"
                  style={{ backgroundColor: profileColor + '20', color: profileColor, borderColor: profileColor }}
                >
                  Perfil {profile.perfil}
                </div>
                <span className="analysis-cv-text">
                  Coeficiente de Variação: <strong>{profile.cv}%</strong>
                </span>
              </div>
              <p className="analysis-insight-text">{profile.descricao}</p>

              <div className="analysis-insight-summary" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                <div className="analysis-insight-item">
                  <span>Fator de Carga</span>
                  <strong style={{ color: efficiency.fatorCarga > 0.6 ? '#10b981' : '#f59e0b' }}>
                    {efficiency.fatorCarga}
                  </strong>
                </div>
                <div className="analysis-insight-item">
                  <span>Picos Históricos</span>
                  <strong style={{ color: peaks.length > 3 ? '#ef4444' : '#2563eb' }}>
                    {peaks.length}
                  </strong>
                </div>
                <div className="analysis-insight-item">
                  <span>Amplitude</span>
                  <strong>{Math.round((metrics.maximo - metrics.minimo) * 100) / 100} kWh</strong>
                </div>
              </div>

              {efficiency.fatorCarga < 0.5 && (
                <div className="analysis-peaks-notice" style={{ marginTop: '30px' }}>
                  <AlertTriangle size={20} color="#ef4444" />
                  <div>
                    <strong>Atenção: Fator de Carga Baixo</strong>
                    <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#7f1d1d' }}>
                      A UC apresenta alta variação entre o consumo médio e os picos de demanda. Isso indica subutilização da infraestrutura na maior parte do tempo e riscos de penalidades por ultrapassagem de demanda. Recomenda-se remanejamento de cargas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'previsao' && (
          <div className="tab-content animate-slide">

            <div className="analysis-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className="analysis-metric-card forecast-card">
                <div className="analysis-metric-icon" style={{ backgroundColor: '#ede9fe' }}>
                  <Brain size={22} color="#7c3aed" />
                </div>
                <div>
                  <span className="analysis-metric-value" style={{ color: '#7c3aed' }}>
                    R$ {forecastedCost}
                  </span>
                  <span className="analysis-metric-label">Custo Estimado Próx. Mês</span>
                </div>
              </div>
              <div className="analysis-metric-card forecast-card">
                <div className="analysis-metric-icon" style={{ backgroundColor: '#fef3c7' }}>
                  <Thermometer size={22} color="#d97706" />
                </div>
                <div>
                  <span className="analysis-metric-value" style={{ color: '#d97706' }}>
                    {Math.round(Math.abs(corrTemp) * 100)}%
                  </span>
                  <span className="analysis-metric-label">
                    Impacto da Temperatura ({corrTemp >= 0 ? '↑ positivo' : '↓ negativo'})
                  </span>
                </div>
              </div>
              <div className="analysis-metric-card forecast-card">
                <div className="analysis-metric-icon" style={{ backgroundColor: hasPeakRisk ? '#fef2f2' : '#d1fae5' }}>
                  <AlertTriangle size={22} color={hasPeakRisk ? '#ef4444' : '#059669'} />
                </div>
                <div>
                  <span className="analysis-metric-value" style={{ color: hasPeakRisk ? '#ef4444' : '#059669' }}>
                    {hasPeakRisk ? 'Alto' : 'Baixo'}
                  </span>
                  <span className="analysis-metric-label">Risco de Pico Previsto</span>
                </div>
              </div>
            </div>

            <div className="analysis-chart-card">
              <div className="analysis-chart-header">
                <h3>Série Histórica + Previsão (4 semanas)</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#6b7280' }}>
                    <div style={{ width: 24, height: 3, background: '#2563eb', borderRadius: 2 }}></div> Histórico
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#6b7280' }}>
                    <div style={{ width: 24, height: 3, background: '#7c3aed', borderRadius: 2, borderTop: '2px dashed #7c3aed' }}></div> Projetado
                  </span>
                  {mockData.dados.some(d => d.hasHoliday) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#f59e0b' }}>
                      <Calendar size={14} color="#f59e0b" /> Mês c/ Feriado
                    </span>
                  )}
                </div>
              </div>
              <div className="analysis-chart-body" style={{ height: '360px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fullSeries} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} unit=" kWh" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const entry = fullSeries.find(d => d.label === label);
                          return (
                            <div className="analysis-tooltip">
                              <p className="analysis-tooltip-label">{label}</p>
                              <p className="analysis-tooltip-value">{payload[0].value} kWh</p>
                              {entry?.isForecast && <p style={{ color: '#7c3aed', fontSize: '0.8rem', margin: 0 }}>⚡ Valor Projetado</p>}
                              {entry?.hasHoliday && <p style={{ color: '#f59e0b', fontSize: '0.8rem', margin: 0 }}>📅 Mês com Feriado</p>}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    <ReferenceLine
                      x={mockData.dados[mockData.dados.length - 1]?.label}
                      stroke="#9ca3af"
                      strokeDasharray="4 4"
                      label={{ value: 'Hoje', fill: '#9ca3af', fontSize: 12, position: 'insideTopRight' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="consumo"
                      strokeWidth={2.5}
                      dot={(props) => {
                        const entry = fullSeries[props.index];
                        const isHoliday = entry?.hasHoliday;
                        const isForecast = entry?.isForecast;
                        return (
                          <circle
                            key={props.key}
                            cx={props.cx}
                            cy={props.cy}
                            r={isHoliday ? 7 : 4}
                            fill={isForecast ? '#7c3aed' : isHoliday ? '#f59e0b' : '#2563eb'}
                            stroke="white"
                            strokeWidth={2}
                          />
                        );
                      }}
                      stroke="url(#lineGrad)"
                    />
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="80%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="analysis-chart-card" style={{ marginTop: '30px' }}>
              <div className="analysis-chart-header">
                <h3>Correlação: Temperatura vs. Consumo</h3>
                <span className="analysis-uc-badge" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                  r = {corrTemp}
                </span>
              </div>
              <div className="analysis-chart-body" style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={climateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} unit=" kWh" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#ef4444' }} unit=" °C" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="analysis-tooltip">
                              <p className="analysis-tooltip-label">{label}</p>
                              {payload.map((p, i) => (
                                <p key={i} style={{ color: p.stroke, margin: '4px 0', fontWeight: 600 }}>
                                  {p.name}: {p.value} {p.name === 'consumo' ? 'kWh' : '°C'}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="consumo" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} name="consumo" />
                    <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} name="temp" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginTop: '16px' }}>
                {Math.abs(corrTemp) > 0.7
                  ? `✅ Correlação forte (${corrTemp}): a temperatura explica ${Math.round(Math.abs(corrTemp) * 100)}% da variação de consumo.`
                  : `ℹ️ Correlação moderada (${corrTemp}): temperatura tem impacto parcial no consumo.`}
              </p>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default AnaliseConsumo;
