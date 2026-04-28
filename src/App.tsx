/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Search,
  ChevronRight,
  ShieldCheck,
  HandCoins,
  BadgeCheck,
  Headphones,
  Gauge,
  Calendar,
  ChevronDown,
  Calculator,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  ArrowRight
} from 'lucide-react';
import VehicleDetails from './VehicleDetails.tsx';
import { Vehicle, IMG } from './types.ts';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// --- Featured (shown in "Destaques da Semana") ---
const FEATURED_VEHICLES: Vehicle[] = [
  { id: 'f1', name: 'Honda Civic Touring', price: '119.900', km: '15.000', year: '2023', fuel: 'Flex', image: IMG.civic, tag: 'DESTAQUE', brand: 'Honda' },
  { id: 'f2', name: 'Toyota Corolla XEI', price: '142.900', km: '28.000', year: '2022', fuel: 'Flex', image: IMG.corolla, tag: 'DESTAQUE', brand: 'Toyota' },
  { id: 'f3', name: 'Jeep Compass Limited', price: '138.900', km: '45.000', year: '2021', fuel: 'Flex', image: IMG.jeep, tag: 'DESTAQUE', brand: 'Jeep' },
  { id: 'f4', name: 'Ford Territory Titanium', price: '149.900', km: '12.000', year: '2023', fuel: 'Turbo', image: IMG.ford, brand: 'Ford' },
];

// --- Full Inventory (18 vehicles) ---
const INVENTORY: Vehicle[] = [
  { id: '1', name: 'Honda Civic Touring', price: '119.900', km: '15.000', year: '2023', fuel: 'Flex', image: IMG.civic, tag: 'DESTAQUE', brand: 'Honda' },
  { id: '2', name: 'Toyota Corolla XEI', price: '142.900', km: '28.000', year: '2022', fuel: 'Flex', image: IMG.corolla, tag: 'DESTAQUE', brand: 'Toyota' },
  { id: '3', name: 'Jeep Compass Limited', price: '138.900', km: '45.000', year: '2021', fuel: 'Flex', image: IMG.jeep, tag: 'DESTAQUE', brand: 'Jeep' },
  { id: '4', name: 'Hyundai HB20S Premium', price: '89.900', km: '8.000', year: '2023', fuel: 'Flex', image: IMG.civic, tag: 'NOVO', brand: 'Hyundai' },
  { id: '5', name: 'Chevrolet Tracker Premier', price: '119.900', km: '35.000', year: '2022', fuel: 'Turbo', image: IMG.audi, brand: 'Chevrolet' },
  { id: '6', name: 'Volkswagen T-Cross High', price: '108.900', km: '22.000', year: '2022', fuel: 'Turbo', image: IMG.vw, tag: 'DESTAQUE', brand: 'Volkswagen' },
  { id: '7', name: 'Fiat Pulse Drive', price: '94.900', km: '12.000', year: '2023', fuel: 'Flex', image: IMG.ford, brand: 'Fiat' },
  { id: '8', name: 'Ford Territory Titanium', price: '149.900', km: '30.000', year: '2022', fuel: 'Turbo', image: IMG.ford, tag: 'DESTAQUE', brand: 'Ford' },
  { id: '9', name: 'Nissan Kicks Advance', price: '112.900', km: '18.000', year: '2023', fuel: 'Flex', image: IMG.audi, brand: 'Nissan' },
  { id: '10', name: 'Renault Kardian Intense', price: '98.900', km: '9.000', year: '2024', fuel: 'Turbo', image: IMG.bmw, tag: 'NOVO', brand: 'Renault' },
  { id: '11', name: 'Toyota Yaris XLS', price: '89.900', km: '25.000', year: '2022', fuel: 'Flex', image: IMG.corolla, brand: 'Toyota' },
  { id: '12', name: 'Volkswagen Polo Track', price: '79.900', km: '6.000', year: '2024', fuel: 'Flex', image: IMG.vw, tag: 'NOVO', brand: 'Volkswagen' },
  { id: '13', name: 'Honda HR-V EXL', price: '129.900', km: '42.000', year: '2021', fuel: 'Flex', image: IMG.civic, tag: 'DESTAQUE', brand: 'Honda' },
  { id: '14', name: 'Chevrolet Onix Plus Premier', price: '84.900', km: '15.000', year: '2023', fuel: 'Turbo', image: IMG.audi, brand: 'Chevrolet' },
  { id: '15', name: 'Jeep Renegade Longitude', price: '119.900', km: '38.000', year: '2022', fuel: 'Flex', image: IMG.jeep, brand: 'Jeep' },
  { id: '16', name: 'Hyundai Creta Action', price: '109.900', km: '20.000', year: '2023', fuel: 'Flex', image: IMG.bmw, brand: 'Hyundai' },
  { id: '17', name: 'Fiat Cronos Drive', price: '74.900', km: '32.000', year: '2022', fuel: 'Flex', image: IMG.ford, brand: 'Fiat' },
  { id: '18', name: 'Nissan Sentra SV', price: '124.900', km: '28.000', year: '2022', fuel: 'CVT', image: IMG.audi, brand: 'Nissan' },
];

const BRANDS = ['Todas', 'Chevrolet', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Nissan', 'Renault', 'Toyota', 'Volkswagen'];
const ITEMS_PER_PAGE = 6;

// --- Components ---

const VehicleCard: React.FC<{ vehicle: Vehicle; onSelect: (v: Vehicle) => void }> = ({ vehicle, onSelect }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    onClick={() => onSelect(vehicle)}
    className="bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-gold/40 hover:shadow-[0_0_15px_rgba(201,150,10,0.1)] transition-all duration-300 group cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      {vehicle.tag && (
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${vehicle.tag === 'NOVO'
            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
            : 'bg-amber-950/80 text-gold border border-gold/40'
            }`}
        >
          {vehicle.tag}
        </div>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-bold text-white text-[15px] mb-1 leading-snug">{vehicle.name}</h3>
      <p className="text-white/40 text-xs mb-3">
        {vehicle.year}&nbsp;·&nbsp;{vehicle.km} km&nbsp;·&nbsp;{vehicle.fuel}
      </p>
      <p className="text-gold font-black text-xl">R$ {vehicle.price}</p>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 h-20 z-50 transition-all duration-300 ${scrolled ? 'premium-blur border-b border-white/5 h-16' : 'bg-transparent'}`}>
      <div className="flex items-center">
        <img src="/LOGOSVG.svg" alt="Caio Veículos" className="h-8 md:h-10 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-8">
        {['Home', 'Estoque', 'Sobre', 'Contato'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-sans uppercase tracking-widest text-xs font-bold text-white/70 hover:text-gold transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden lg:block bg-gold-gradient text-surface font-bold uppercase tracking-wider text-xs px-6 py-2.5 rounded-[0.5rem] hover:shadow-[0_0_20px_rgba(201,150,10,0.4)] transition-all active:scale-95">
          Ver estoque
        </button>
        <button className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors font-bold uppercase tracking-wider text-xs">
          <WhatsAppIcon className="w-4 h-4 text-gold" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const [filterBrand, setFilterBrand] = useState('Todas');
  const [filterYear, setFilterYear] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredInventory, setFilteredInventory] = useState(INVENTORY);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    let result = INVENTORY;
    if (filterBrand !== 'Todas') result = result.filter(v => v.brand === filterBrand);
    if (filterYear) result = result.filter(v => v.year === filterYear);
    if (filterPrice === 'ate100') result = result.filter(v => parseInt(v.price.replace(/\./g, '')) <= 100000);
    else if (filterPrice === '100a150') result = result.filter(v => { const p = parseInt(v.price.replace(/\./g, '')); return p > 100000 && p <= 150000; });
    else if (filterPrice === 'acima150') result = result.filter(v => parseInt(v.price.replace(/\./g, '')) > 150000);
    setFilteredInventory(result);
    setCurrentPage(1);
  }, [filterBrand, filterYear, filterPrice]);

  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-[#0a0a0a] text-on-surface font-sans overflow-x-hidden selection:bg-gold/30 selection:text-white">
      <Navbar />

      {selectedVehicle ? (
        <div className="pt-20">
          <VehicleDetails vehicle={selectedVehicle} onBack={() => setSelectedVehicle(null)} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ duration: 1.5 }}
                alt="Fachada Caio Veículos"
                className="w-full h-full object-cover"
                src="/fachada.png"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                  Realize o sonho do seu carro com <span className="text-gold-gradient">quem entende</span> de você
                </h1>
                <p className="text-lg md:text-xl text-white/70 mb-10 border-l-4 border-gold/30 pl-6 leading-relaxed">
                  Negociação direta, sem enrolação em Rio Claro. O seu próximo veículo com a confiança de quem valoriza sua história há mais de 15 anos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#estoque"
                    className="border-2 border-gold text-gold px-8 py-4 rounded-[0.5rem] font-bold text-center hover:bg-gold/10 transition-all flex items-center justify-center gap-2 group"
                  >
                    Ver Estoque Completo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                    animate={{
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        '0 0 0px rgba(201,150,10,0)',
                        '0 0 28px rgba(201,150,10,0.55)',
                        '0 0 0px rgba(201,150,10,0)',
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/5519999999999"
                    className="bg-gold text-surface px-8 py-4 rounded-[0.5rem] font-bold text-center flex items-center justify-center gap-2 group shadow-lg"
                  >
                    Chamar No WhatsApp
                    <WhatsAppIcon className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">Destaques da <span className="text-gold-gradient">Semana</span></h2>
                  <div className="h-1.5 w-20 bg-gold-gradient rounded-full"></div>
                </div>
                <a href="#estoque" className="text-gold-bright font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group">
                  Ver tudo <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURED_VEHICLES.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={setSelectedVehicle} />
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-24 bg-[#0d0d0d] relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Por que a <span className="text-gold-gradient">Caio Veículos?</span></h2>
                <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
                  Tradição e transparência em cada quilômetro. Confira o que nos torna referência em Rio Claro.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: HandCoins, title: "Negociação direta", desc: "Fale direto com quem decide. Sem intermediários e com total agilidade." },
                  { icon: Calculator, title: "Financiamento fácil", desc: "Parceria com os maiores bancos para garantir a melhor taxa do mercado." },
                  { icon: ShieldCheck, title: "Procedência", desc: "Todos os veículos são periciados e revisados antes de serem expostos." },
                  { icon: Headphones, title: "Atendimento Premium", desc: "Suporte personalizado via WhatsApp com vídeos detalhados dos carros." }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 bg-[#141414] rounded-2xl border border-white/5 hover:border-gold/30 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gold-bright transition-colors uppercase tracking-tight">{benefit.title}</h4>
                    <p className="text-white/50 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Inventory Section */}
          <section id="estoque" className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                  <p className="text-gold text-[11px] font-black uppercase tracking-[0.2em] mb-1">NOSSO ACERVO</p>
                  <h2 className="text-4xl font-black text-white">Nosso Estoque</h2>
                </div>
                <p className="text-white/40 text-sm">{filteredInventory.length} veículos encontrados</p>
              </div>

              {/* Filter dropdowns (pill style) */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative">
                  <select
                    value={filterPrice}
                    onChange={e => setFilterPrice(e.target.value)}
                    className="bg-[#161616] border border-white/10 text-white/80 rounded-full py-2 pl-4 pr-9 text-sm outline-none appearance-none focus:border-gold/40 transition-colors cursor-pointer"
                  >
                    <option value="">Qualquer preço</option>
                    <option value="ate100">Até R$ 100.000</option>
                    <option value="100a150">R$ 100k – R$ 150k</option>
                    <option value="acima150">Acima de R$ 150.000</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterYear}
                    onChange={e => setFilterYear(e.target.value)}
                    className="bg-[#161616] border border-white/10 text-white/80 rounded-full py-2 pl-4 pr-9 text-sm outline-none appearance-none focus:border-gold/40 transition-colors cursor-pointer"
                  >
                    <option value="">Qualquer ano</option>
                    {['2024', '2023', '2022', '2021'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Brand pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setFilterBrand(brand)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${filterBrand === brand
                      ? 'bg-gold text-[#0a0a0a]'
                      : 'bg-transparent border border-white/15 text-white/60 hover:border-gold/40 hover:text-white/90'
                      }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedInventory.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={setSelectedVehicle} />
                  ))}
                  {paginatedInventory.length === 0 && (
                    <div className="col-span-3 text-center py-20 text-white/30 text-lg">
                      Nenhum veículo encontrado com os filtros selecionados.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-[0.5rem] text-sm font-bold transition-all duration-200 ${currentPage === page
                        ? 'bg-gold text-[#0a0a0a] shadow-[0_0_16px_rgba(201,150,10,0.4)]'
                        : 'bg-[#161616] border border-white/10 text-white/60 hover:border-gold/30'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Process Section */}
          <section className="py-24 bg-[#0b0b0b] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
              <h2 className="text-4xl font-bold text-white mb-20 text-center">Como conquistar seu <span className="text-gold-gradient">carro novo</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-[40px] left-[15%] w-[70%] h-[1px] bg-gold/20 z-0"></div>
                {[
                  { step: 1, title: "Escolha o modelo", desc: "Navegue pelo nosso estoque e encontre o modelo ideal para seu estilo." },
                  { step: 2, title: "Negocie via WhatsApp", desc: "Avaliação rápida do usado e simulação de parcelas personalizada." },
                  { step: 3, title: "Finalize na loja", desc: "Test-drive, assinatura e saída imediata com seu novo veículo." }
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative z-10 flex flex-col items-center text-center group"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold-gradient text-surface flex items-center justify-center font-black text-3xl mb-8 shadow-[0_0_40px_rgba(201,150,10,0.4)] group-hover:scale-110 transition-transform">
                      {p.step}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">{p.title}</h4>
                    <p className="text-white/50 max-w-[280px] leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Financing Section */}
          <section className="py-24">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0a0a0a] rounded-[2rem] p-8 md:p-16 border border-gold/20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gold-gradient"></div>

                <div className="flex-1 relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Financiamento com <br /><span className="text-gold-gradient">Taxas Exclusivas</span></h2>
                  <p className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                    Trabalhamos com condições diferenciadas e aprovação facilitada. Realize o sonho do carro novo com parcelas que cabem no seu bolso.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gold-gradient text-surface px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_15px_30px_rgba(201,150,10,0.4)] transition-all flex items-center gap-3"
                  >
                    <Calculator className="w-6 h-6" /> Simular parcelas agora
                  </motion.button>
                </div>

                <div className="w-full lg:w-[400px] grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { val: "0%", label: "Entrada Facilitada" },
                    { val: "60x", label: "Até 60 Parcelas" }
                  ].map((metric, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 border border-white/5 backdrop-blur-xl hover:border-gold/30 transition-colors shadow-lg">
                      <span className="text-gold-gradient font-black text-5xl mb-2">{metric.val}</span>
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-widest text-center">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="sobre" className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gold blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10">
                    <img
                      alt="Fachada Caio Veículos"
                      className="w-full h-[500px] object-cover"
                      src="/fachada.png"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-gold-gradient p-8 rounded-3xl hidden sm:block z-20 shadow-2xl">
                    <p className="text-surface font-black text-6xl leading-none">15+</p>
                    <p className="text-surface font-black text-xs uppercase tracking-[0.2em] mt-2">Anos de Tradição</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Confiança que atravessa <br /><span className="text-gold-gradient">gerações</span></h2>
                  <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                    <p>Na Caio Veículos, não vendemos apenas automóveis; entregamos a chave para novas histórias. Localizada no coração de Rio Claro, nossa loja é sinônimo de integridade e excelência no mercado automotivo.</p>
                    <p>Cada veículo em nosso pátio passa por um rigoroso processo de curadoria técnica. Tratamos cada cliente com a exclusividade que ele merece, garantindo transparência total.</p>

                    <div className="pt-10 flex gap-12">
                      {[
                        { val: "2k+", label: "Veículos Entregues" },
                        { val: "98%", label: "Satisfação" }
                      ].map((stat, i) => (
                        <div key={i}>
                          <h4 className="text-gold-gradient font-black text-4xl mb-1">{stat.val}</h4>
                          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contato" className="py-24">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-10">Visite nossa <span className="text-gold-gradient">Showroom</span></h2>

                  <div className="space-y-10 mb-12">
                    {[
                      { icon: MapPin, title: "Endereço", content: "Rua 1, 2622 — Centro, Rio Claro/SP" },
                      { icon: Phone, title: "Telefone / WhatsApp", content: "(19) 99999-9999" },
                      { icon: Clock, title: "Horário", content: "Seg a Sex: 08:00 - 18:00 | Sáb: 08:00 - 13:00" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-6 group">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20 group-hover:bg-gold transition-all">
                          <item.icon className="w-6 h-6 text-gold group-hover:text-surface transition-colors" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xl mb-1">{item.title}</h4>
                          <p className="text-white/60 text-lg">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {[Instagram, Facebook].map((Icon, i) => (
                      <motion.a
                        key={i}
                        whileHover={{ scale: 1.1, y: -4 }}
                        href="#"
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gold-gradient hover:text-surface transition-all shadow-xl"
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group">
                  <img
                    alt="Map location"
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTsCBlVqgN9hA3Q-_aNbuSndYyUBCh83Hg5rPwCucb2TTW2mRpRZ6_Q_7rfSg8N_JOyied1chMOY2Igm4xsOksQrarsh97PxSi-E6HpkzHRU8TQcK-foOfhPnRmIJNxMwIpisWQH5Rfjn-Y6SO5qCARf8VcWz7NhD6g1wCN1rtWh4jpL-QuPCuMBueAiI5lmOvB2uvLAJo5QiTxHkX3o4_hh2Hv2jwHMMmvKfk80kwR7pQsxOMiiSk7bciRgZELNSuM2cKyiUOC08"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gold text-surface px-8 py-3 rounded-full font-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/20 text-sm flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 fill-current" /> Caio Veículos
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-surface-container-lowest border-t border-white/5 py-12">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="mb-4">
                  <img src="/LOGOSVG.svg" alt="Caio Veículos" className="h-8 md:h-10 w-auto" />
                </div>
                <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">© 2024. Excelência Automotiva em Rio Claro.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {['Estoque', 'Financiamento', 'Sobre Nós', 'Privacidade'].map((link) => (
                  <a key={link} href="#" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-gold transition-colors">{link}</a>
                ))}
              </div>
            </div>
          </footer>

          <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 group">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none bg-[#161616] border border-white/10 text-white px-4 py-2.5 rounded-[0.5rem] shadow-2xl text-sm font-semibold">
              Fala com a gente! 👋
            </div>

            <motion.a
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/5519999999999"
              target="_blank"
              rel="noreferrer"
              className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,211,102,0.4)] border border-white/20"
            >
              <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>

              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current relative z-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>

              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#FF3B30] rounded-full border-2 border-[#0a0a0a] z-20"></span>
            </motion.a>
          </div>
        </>
      )}
    </div>
  );
}
