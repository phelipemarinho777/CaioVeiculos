import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Gauge,
  Calendar,
  Palette,
  Droplet,
  CarFront,
  Settings,
  Check,
  Calculator,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Vehicle, IMG } from './App';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onBack: () => void;
}

export default function VehicleDetails({ vehicle, onBack }: VehicleDetailsProps) {
  // Mocking extra details if not present
  const images = vehicle.images || [
    vehicle.image,
    IMG.bmw,
    IMG.audi,
    IMG.jeep,
    IMG.ford
  ];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const attributes = [
    { icon: Gauge, label: 'Quilometragem', value: `${vehicle.km} km` },
    { icon: Calendar, label: 'Ano', value: vehicle.year },
    { icon: Palette, label: 'Cor', value: vehicle.color || 'Preto' },
    { icon: Droplet, label: 'Combustível', value: vehicle.fuel },
    { icon: CarFront, label: 'Portas', value: vehicle.doors ? vehicle.doors.toString() : '4' },
    { icon: Settings, label: 'Câmbio', value: vehicle.transmission || 'Automático' }
  ];

  const accessories = vehicle.accessories || [
    'Ar Condicionado',
    'Banco Motorista com Regulagem de Altura',
    'Bancos em Couro',
    'Câmbio Automático',
    'Computador de Bordo',
    'Controle de Som no Volante',
    'Desembaçador Traseiro',
    'Direção Elétrica',
    'Limpador Traseiro',
    'Multimídia',
    'Painel Digital',
    'Rodas de Liga Leves',
    'Teto Solar'
  ];

  const handleNextImage = () => setActiveImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="container mx-auto px-6 md:px-12 max-w-7xl pb-24">
      {/* Back Button & Header */}
      <div className="py-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o estoque
        </button>
        <h1 className="text-2xl md:text-3xl font-black text-white">{vehicle.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Images, Attributes, Accessories */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Main Image & Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#111111] border border-white/5 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImageIndex]}
                  alt={`${vehicle.name} foto ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-black"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-black"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {attributes.map((attr, idx) => (
              <div key={idx} className="bg-[#111111] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-gold/20 transition-colors">
                <attr.icon className="w-8 h-8 text-white/30" />
                <div>
                  <p className="text-white font-bold text-lg">{attr.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{attr.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accessories */}
          <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5">
            <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-gold" />
                Acessórios
              </h3>
            </div>
            <div className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {accessories.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            
            {/* Price & CTAs */}
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-center font-black text-4xl text-gold-gradient mb-8">
                R$ {vehicle.price}
              </h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => window.open(`https://wa.me/5519999999999?text=${encodeURIComponent(`Olá, tenho interesse no veículo ${vehicle.name}`)}`, '_blank')}
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Proposta por Whatsapp
                </button>
                <button className="w-full bg-transparent border-2 border-white/10 text-white hover:border-white/30 hover:bg-white/5 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                  <Mail className="w-5 h-5" />
                  Proposta por E-mail
                </button>
              </div>
            </div>

            {/* Financing Simulation Form */}
            <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
              <div className="bg-[#1a1a1a] px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold" />
                <h3 className="text-lg font-bold text-white">Simular Financiamento</h3>
              </div>
              
              <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Valor da Entrada" 
                      className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <select className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-gold/40 focus:outline-none transition-colors appearance-none cursor-pointer">
                      <option value="">Parcelas</option>
                      <option value="12">12x</option>
                      <option value="24">24x</option>
                      <option value="36">36x</option>
                      <option value="48">48x</option>
                      <option value="60">60x</option>
                    </select>
                  </div>
                </div>

                <input 
                  type="text" 
                  placeholder="Nome Completo" 
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                />
                
                <input 
                  type="email" 
                  placeholder="Endereço de E-mail" 
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Data Nascimento" 
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="CPF" 
                    className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>

                <input 
                  type="tel" 
                  placeholder="Celular" 
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none transition-colors"
                />

                <button 
                  type="submit"
                  className="w-full mt-4 bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors shadow-lg shadow-[#25D366]/20"
                >
                  Enviar Simulação
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
