import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FIPEZAP_DATA } from "@/lib/financial-constants";
import { useFinancialCalculations } from "@/hooks/useFinancialCalculations";
import { PortfolioDonut } from "@/components/charts/PortfolioDonut";
import { EvolutionAreaChart } from "@/components/charts/EvolutionAreaChart";
import { ArrowRight, Building2, TrendingUp, Wallet, Calendar, PiggyBank } from "lucide-react";

export default function Home() {
  const [aporteMensal, setAporteMensal] = useState(1500);
  const [salarioDesejado, setSalarioDesejado] = useState(5000);
  const [porcentualImoveis, setPorcentualImoveis] = useState(0.8);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("Recife");

  const results = useFinancialCalculations({
    aporteMensal,
    salarioDesejado,
    porcentualImoveis,
    cidadeSelecionada
  });

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50 } as any
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 overflow-x-hidden">
      <motion.div 
        className="container mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-12 text-center md:text-left" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-2">
            Férias para Sempre
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
            Planeje sua independência financeira com precisão matemática e clareza visual.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Inputs (Glass Panel) */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
            <Card className="glass-card p-6 md:p-8 space-y-8 h-full border-white/40">
              
              {/* Aporte Mensal */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Aporte Mensal</label>
                  <span className="text-xl font-bold text-primary">{formatCurrency(aporteMensal)}</span>
                </div>
                <Slider 
                  value={[aporteMensal]} 
                  onValueChange={(v) => setAporteMensal(v[0])} 
                  max={20000} 
                  step={100}
                  className="py-2"
                />
              </div>

              {/* Salário Desejado */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Renda Passiva Desejada</label>
                  <span className="text-xl font-bold text-primary">{formatCurrency(salarioDesejado)}</span>
                </div>
                <Slider 
                  value={[salarioDesejado]} 
                  onValueChange={(v) => setSalarioDesejado(v[0])} 
                  max={50000} 
                  step={500}
                  className="py-2"
                />
              </div>

              {/* Alocação de Portfólio */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Alocação em Imóveis</label>
                  <span className="text-xl font-bold text-primary">{Math.round(porcentualImoveis * 100)}%</span>
                </div>
                <Slider 
                  value={[porcentualImoveis]} 
                  onValueChange={(v) => setPorcentualImoveis(v[0])} 
                  max={1} 
                  step={0.05}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>Financeiro ({Math.round((1 - porcentualImoveis) * 100)}%)</span>
                  <span>Imóveis ({Math.round(porcentualImoveis * 100)}%)</span>
                </div>
              </div>

              {/* Seleção de Cidade */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Região (Índice FipeZap)</label>
                <Select value={cidadeSelecionada} onValueChange={setCidadeSelecionada}>
                  <SelectTrigger className="glass-input w-full h-12 text-lg">
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {FIPEZAP_DATA.map((city) => (
                      <SelectItem key={city.ordem} value={city.cidade}>
                        {city.cidade} - {city.uf} ({city.indice}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </Card>
          </motion.div>

          {/* Right Column: Bento Grid Results */}
          <motion.div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            
            {/* Main Result: Patrimônio Total */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <Card className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white/60 to-blue-50/30 dark:from-white/10 dark:to-blue-900/10">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Patrimônio Necessário</h3>
                  <div className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
                    {formatCurrency(results.patrimonioNecessario)}
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/40 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Tempo Estimado</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.floor(results.tempoAnos)} anos <span className="text-sm font-normal text-muted-foreground">e {Math.round((results.tempoAnos % 1) * 12)} meses</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Chart: Evolution */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <Card className="glass-card p-6 h-[400px] flex flex-col">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Evolução Patrimonial
                </h3>
                <div className="flex-1">
                  <EvolutionAreaChart 
                    tempoMeses={results.tempoMesesTotal} 
                    aporteMensal={aporteMensal}
                    taxaMensal={results.taxaMensalComposta}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Chart: Allocation */}
            <motion.div variants={itemVariants}>
              <Card className="glass-card p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Alocação de Ativos
                </h3>
                <div className="flex-1 flex items-center justify-center">
                  <PortfolioDonut 
                    imoveis={results.patrimonioImoveis} 
                    financeiro={results.patrimonioFinanceiro} 
                  />
                </div>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className="grid grid-rows-2 gap-6" variants={itemVariants}>
              <Card className="glass-card p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Aportado</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(results.totalAportado)}</p>
                <p className="text-xs text-muted-foreground mt-1">Capital saindo do seu bolso</p>
              </Card>

              <Card className="glass-card p-6 flex flex-col justify-center bg-primary/5 border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <PiggyBank className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Juros Acumulados</span>
                </div>
                <p className="text-2xl font-bold text-primary">{formatCurrency(results.totalJuros)}</p>
                <p className="text-xs text-muted-foreground mt-1">O dinheiro trabalhando por você</p>
              </Card>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
