/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  MessageCircle,
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

// --- Data Types ---
export interface Vehicle {
  id: string;
  name: string;
  price: string;
  km: string;
  year: string;
  image: string;
  tag?: string;
  brand: string;
  fuel: string;
  color?: string;
  doors?: number;
  transmission?: string;
  images?: string[];
  accessories?: string[];
}

// --- Images (reused across vehicles for demo) ---
export const IMG = {
  civic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEtzmXXraze316AsqPqtVi1E3aStuuf11If5CMbZdmT0sdMnuJz1jEaqRWC4CQ7C3re83nTh4d-FAJkh1xNy1kzwA5qrYqjzphd0fhrH_HViuqG62dBiHtei214lMnNQXghb5P3tFcFYc3Gggd03hJlh0sNmkRbd4UhNbOwIInSr0iXx_-VlwzN0Mr6rpTERsL-RvYL2H0Vc_s7mBPoTDW4auDFwIhNqbHyL0Hy3ldssoAy1q9dHxbVyuvfUw9QvJIRX0c6zBB_PE',
  corolla: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe4UK26uq4DIwokcetCo2YQEpRsfym8jK8WQ-kUqDbc3-gdPBrxq2djv9OVY1zricFqd5U2n3-e8jc5cMLNG6DbY-CbSEOAwOcmxhsR7EiJ79kvu64LmSaSDDAgsUa2NZ95QM5HtSkQ8sz1j7MXFi3KxX7mUTxbQ4S6I-a-8agNJuCKkcXWfxDL7-W5pg3lEFLgs3dJvp7xeqOsa9g58bmHrrBH4h7z0GsoeSCnWhtJBS2Gu3LbnXxw47rwbIh_BACc-suPNjSKh0',
  jeep: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSAQPpNpOaEOR7d7Xtqqklw-TRNBu8UvAf6kC4K6jC3Un7x8wiY9S6L3JvoCnFYB033VbCLd3vZq2OmJtZ8X4Rb3l13G75lkY2uqOIZ8JapMuXAFG_OggbRkvSQQdyB3g82SPdc6nDJ-I700B4Uzwwj33C8Wl1aZeVvd3I8bxKzLS3e82DYvN6lXHXwszmyyImalbHkS4a_tMlniYmc26KazmYQyLb4_QswXq4W6n5G1xgjOIO9zXH3uF_0RCOhbsHPN4lOxO3dp8',
  ford: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Fk68jAISDqJCvd0tolKz8ENwJnu9FexvE5dJQ6-YdsvKY4UGh-3TrekjHgbfvZdp_hdq3hQJgIqwWZve6Lqbp8sqaIdREeTRsaJmA6Luy1gpx0e7CT-2mqR_urZV7BDfzQKMDUcut4IKVacn80iBORtjJX8kuOE--Ahh049KNNlhwyIvxlACWHBCj_Yr0gbOjvsvLdzKRS62DeyXSmtu34ubIwl7bw9ScfCOYdZ_kaUJCuYIxEnzWT3aibrqYbBwckKfMG27QHk',
  bmw: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANQpMeA20R1SzmJi0ULGxb-zMecNcColHzY96qid7lqN-QTh52zxWfGHWVK6pCSvwx4Vq5IvxUBboqI-A8MuqEnABtLdIjNj9M19djHpMv3UutuuxrH86l9peFHOLXjaWVZakYiJ69OUIihk5xowsmy3VTB4p9CzCEjT73M5O9ZQPyxz8E3jza8hwKzd6LJXBOQFcYTOLAvHc2Nq_4vn6AJxRSO9G_ZQq479UWJN9qoiEhAOCKtva0uV7BH07bK1P9PX3_TlF5GOs',
  audi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyapxmqBFLnnL6HOoeNKl51tTyx1c_rs6I-d1TgxjKDqyqCDI5IrxlvYrgcj4W2YW0el9sBPFTSxjIvIOjhvcvTNMIemlCKOrY2wZvQuYllvmq_SkGmORXDP3qOWVr7qEbEIWcjv0JiXQGD04vdhpy0AT0ERScZauaH-FlcFRhXXou6WLGiwp8HHlUOktuhFsUYiiDIZRNOy1uUcReSm8HvNcI-BAfKIAyd92Kj3PNnnqPRjwI2Y_AzPjnhC3ecaWRdlKEQHIgRTI',
  vw: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh7-0FE68rvM_sNWme-f6RNYX0hydqSeibVST_SVDUlVefb8pK6_GFUDcN7_YpaPN5ReDfBwWDyiSWS6yvj5raaD58U8u1oUMvQO3BairwPnSacoOHdlaZaAYFHH-iR4dL2MvzlztYOZ8RrNZnVoe4J3H7LUef2Rmz1QdwZdrTjoWn8J_r0YqcNJAR2uyIOTZIiNYuyIxvkBX02Gj_ok1q0fyMD-p9yNmYn1yBFXHNe8QUNgNeD4YEc8yovfZayS9S-JLjes17vWY',
};

// --- Featured (shown in "Destaques da Semana") ---
const FEATURED_VEHICLES: Vehicle[] = [
  { id: 'f1', name: 'Honda Civic Touring', price: '119.900', km: '15.000', year: '2023', fuel: 'Flex', image: IMG.civic, tag: 'DESTAQUE', brand: 'Honda' },
  { id: 'f2', name: 'Toyota Corolla XEI', price: '142.900', km: '28.000', year: '2022', fuel: 'Flex', image: IMG.corolla, tag: 'DESTAQUE', brand: 'Toyota' },
  { id: 'f3', name: 'Jeep Compass Limited', price: '138.900', km: '45.000', year: '2021', fuel: 'Flex', image: IMG.jeep, tag: 'DESTAQUE', brand: 'Jeep' },
  { id: 'f4', name: 'Ford Territory Titanium', price: '149.900', km: '12.000', year: '2023', fuel: 'Turbo', image: IMG.ford, brand: 'Ford' },
];

// --- Full Inventory (18 vehicles) ---
const INVENTORY: Vehicle[] = [
  { id: '1',  name: 'Honda Civic Touring',        price: '119.900', km: '15.000', year: '2023', fuel: 'Flex',  image: IMG.civic,   tag: 'DESTAQUE', brand: 'Honda' },
  { id: '2',  name: 'Toyota Corolla XEI',         price: '142.900', km: '28.000', year: '2022', fuel: 'Flex',  image: IMG.corolla, tag: 'DESTAQUE', brand: 'Toyota' },
  { id: '3',  name: 'Jeep Compass Limited',       price: '138.900', km: '45.000', year: '2021', fuel: 'Flex',  image: IMG.jeep,    tag: 'DESTAQUE', brand: 'Jeep' },
  { id: '4',  name: 'Hyundai HB20S Premium',      price: '89.900',  km: '8.000',  year: '2023', fuel: 'Flex',  image: IMG.civic,   tag: 'NOVO',     brand: 'Hyundai' },
  { id: '5',  name: 'Chevrolet Tracker Premier',  price: '119.900', km: '35.000', year: '2022', fuel: 'Turbo', image: IMG.audi,                      brand: 'Chevrolet' },
  { id: '6',  name: 'Volkswagen T-Cross High',    price: '108.900', km: '22.000', year: '2022', fuel: 'Turbo', image: IMG.vw,      tag: 'DESTAQUE', brand: 'Volkswagen' },
  { id: '7',  name: 'Fiat Pulse Drive',           price: '94.900',  km: '12.000', year: '2023', fuel: 'Flex',  image: IMG.ford,                      brand: 'Fiat' },
  { id: '8',  name: 'Ford Territory Titanium',    price: '149.900', km: '30.000', year: '2022', fuel: 'Turbo', image: IMG.ford,    tag: 'DESTAQUE', brand: 'Ford' },
  { id: '9',  name: 'Nissan Kicks Advance',       price: '112.900', km: '18.000', year: '2023', fuel: 'Flex',  image: IMG.audi,                      brand: 'Nissan' },
  { id: '10', name: 'Renault Kardian Intense',    price: '98.900',  km: '9.000',  year: '2024', fuel: 'Turbo', image: IMG.bmw,     tag: 'NOVO',     brand: 'Renault' },
  { id: '11', name: 'Toyota Yaris XLS',           price: '89.900',  km: '25.000', year: '2022', fuel: 'Flex',  image: IMG.corolla,                   brand: 'Toyota' },
  { id: '12', name: 'Volkswagen Polo Track',      price: '79.900',  km: '6.000',  year: '2024', fuel: 'Flex',  image: IMG.vw,      tag: 'NOVO',     brand: 'Volkswagen' },
  { id: '13', name: 'Honda HR-V EXL',             price: '129.900', km: '42.000', year: '2021', fuel: 'Flex',  image: IMG.civic,   tag: 'DESTAQUE', brand: 'Honda' },
  { id: '14', name: 'Chevrolet Onix Plus Premier', price: '84.900', km: '15.000', year: '2023', fuel: 'Turbo', image: IMG.audi,                      brand: 'Chevrolet' },
  { id: '15', name: 'Jeep Renegade Longitude',    price: '119.900', km: '38.000', year: '2022', fuel: 'Flex',  image: IMG.jeep,                      brand: 'Jeep' },
  { id: '16', name: 'Hyundai Creta Action',       price: '109.900', km: '20.000', year: '2023', fuel: 'Flex',  image: IMG.bmw,                       brand: 'Hyundai' },
  { id: '17', name: 'Fiat Cronos Drive',          price: '74.900',  km: '32.000', year: '2022', fuel: 'Flex',  image: IMG.ford,                      brand: 'Fiat' },
  { id: '18', name: 'Nissan Sentra SV',           price: '124.900', km: '28.000', year: '2022', fuel: 'CVT',   image: IMG.audi,                      brand: 'Nissan' },
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
          className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
            vehicle.tag === 'NOVO'
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
      <div className="text-2xl font-black tracking-tighter text-white">
        Caio <span className="text-gold-gradient">Veículos</span>
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
        <button className="hidden lg:block bg-gold-gradient text-surface font-bold uppercase tracking-wider text-xs px-6 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(201,150,10,0.4)] transition-all active:scale-95">
          Ver estoque
        </button>
        <button className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors font-bold uppercase tracking-wider text-xs">
          <MessageCircle className="w-4 h-4 text-gold" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
};

import VehicleDetails from './VehicleDetails';

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
            alt="Showroom background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida/ADBb0uhWGCx9H9oApWpsf6e5T_jXovMI3jCo02lj_eUbwzvPD70DSHe-0DlLhjPCiAzwEuU1oaNel594-n1w2mTLD9nFqytl-jnsZxuuIqysEgF9ZWss47Eugm_MKkoI5n1EdgZpW14n5tuq0dQBKW4NoJ8s1-twEcC0si2wtoxKfwyyvfdLNo8HZ-LhLAZ5ncQhMHy67idNS8E7ymu339_44jquaK5TW8qxsUnZJSa6Cu3j3Gi2yPdlWV3Tmc76aZyFkzNYWVKs8Jua"
            referrerPolicy="no-referrer"
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
                className="border-2 border-gold text-gold px-8 py-4 rounded-full font-bold text-center hover:bg-gold/10 transition-all flex items-center justify-center gap-2 group"
              >
                Ver Estoque Completo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5519999999999"
                className="bg-gold text-surface px-8 py-4 rounded-full font-bold text-center hover:shadow-[0_0_25px_rgba(201,150,10,0.4)] transition-all flex items-center justify-center gap-2 group shadow-lg"
              >
                Chamar No WhatsApp
                <MessageCircle className="w-5 h-5 fill-current" />
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
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filterBrand === brand
                    ? 'bg-gold text-[#0a0a0a]'
                    : 'bg-transparent border border-white/15 text-white/60 hover:border-gold/40 hover:text-white/90'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedInventory.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={setSelectedVehicle} />
              ))}
            </AnimatePresence>
            {paginatedInventory.length === 0 && (
              <div className="col-span-3 text-center py-20 text-white/30 text-lg">
                Nenhum veículo encontrado com os filtros selecionados.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-[0.5rem] text-sm font-bold transition-all duration-200 ${
                    currentPage === page
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Financiamento com <br/><span className="text-gold-gradient">Taxas Exclusivas</span></h2>
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
                  alt="Dealership interior"
                  className="w-full h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTB51INTVafQt-6EO7k0gTwZUj05Ql_61ebZteUBVUF9LD14rAOXfkl-NcnGTgEiZOsLZTdxHswLrN6mMMNUi2sqVZlQBkFyiKNFKdoUvOcy7WrRNUfTmAj4RBN6iZW7DGPSmwtXA74A-ZkZaXRicYGJ7FcHiumzGsBM5iBAucBAFM9vp6QmnuZQqupUSQfA0WFORPmfRMwZKeBNONRviYVy7ZEP2PPj2aMDQhjzWNVsRRkE9jAXXA9m6g5NYhG6_xF2HIfqELbtw"
                  referrerPolicy="no-referrer"
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Confiança que atravessa <br/><span className="text-gold-gradient">gerações</span></h2>
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
            <div className="text-2xl font-black text-white mb-2">
              Caio <span className="text-gold-gradient">Veículos</span>
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

      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/5519999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] z-50 border border-white/20"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.a>
        </>
      )}
    </div>
  );
}
