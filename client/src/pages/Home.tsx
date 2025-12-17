import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FIPEZAP_DATA } from "@/lib/financial-constants";
import { useFinancialCalculations } from "@/hooks/useFinancialCalculations";
import { PortfolioDonut } from "@/components/charts/PortfolioDonut";
import { EvolutionAreaChart } from "@/components/charts/EvolutionAreaChart";
import { ArrowRight, Building2, TrendingUp, Wallet, Calendar, PiggyBank, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
            Simule quanto você precisa juntar para viver de renda.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Inputs (Glass Panel) */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
            <Card className="glass-card p-6 md:p-8 space-y-8 h-full border-white/40">
              
              {/* Salário Desejado */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Salário futuro desejado</label>
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
              {/* Alocação de Portfólio */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-muted-foreground">
                      Como dividir seu dinheiro
                    </label>
                  </div>

                  {/* Imóveis Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Imóveis</span>
                      <span className="font-bold text-primary">
                        {Math.round(porcentualImoveis * 100)}%
                      </span>
                    </div>

                    <Slider
                      value={[porcentualImoveis]}
                      onValueChange={(v) => setPorcentualImoveis(v[0])}
                      max={1}
                      step={0.05}
                    />
                  </div>

                  {/* Financeiro Slider (linked) */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Financeiro</span>
                      <span className="font-bold text-primary">
                        {Math.round((1 - porcentualImoveis) * 100)}%
                      </span>
                    </div>

                    <Slider
                      value={[1 - porcentualImoveis]}
                      onValueChange={(v) => setPorcentualImoveis(1 - v[0])}
                      max={1}
                      step={0.05}
                    />
                  </div>
                </div>

                            {/* Aporte Mensal */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-muted-foreground">Quanto você pode investir mensalmente</label>
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
                <p className="text-xs text-muted-foreground leading-snug">
                  Se você optou por alocar parte do seu patrimônio em imóveis, selecione uma das
                  cidades da lista ou alguma com características semelhantes para obter uma
                  estimativa mais precisa.
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  Se não houver alocação em imóveis no seu portfólio, este campo não impacta a simulação e pode ser ignorado. 
                </p>

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
                    <p className="text-xs text-muted-foreground font-medium">Tempo estimado para atingir sua liberdade financeira</p>
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
      
        
        <hr className="my-16 border-t border-muted-foreground/30" />


      {/* Fine Print / Disclaimers */}
        <div className="mt-16 max-w-5xl mx-auto text-xs leading-relaxed text-muted-foreground space-y-4">
          <p>
            Investimentos têm seus riscos e desempenho passado (retorno) não é garantia de retorno futuro.
          </p>
          <p>
            Quando o assunto é aluguel, é necessário considerar fatores como períodos
            de vacância, custos deixados por inquilinos anteriores (contas atrasadas ou
            danos ao imóvel) e eventuais taxas cobradas por imobiliárias. Em imóveis
            localizados em condomínios, durante períodos de vacância, todos os custos —
            como taxa condominial — permanecem sob responsabilidade do proprietário,
            impactando o retorno total do investimento.
          </p>

          <p>
            Nas simulações apresentadas, não são consideradas eventuais receitas de
            aposentadoria pelo INSS. Os resultados refletem exclusivamente receitas
            oriundas de investimentos, seja por meio de aluguéis ou de rendimentos de
            ativos financeiros.
          </p>

          <p>
            Os valores simulados partem de um cenário fixo, hipotético e com finalidade
            exclusivamente educativa. Para uma análise personalizada e adequada à sua
            realidade, recomenda-se a consulta com um profissional de planejamento
            financeiro.
          </p>

          <p>
            Para o cálculo de ativos financeiros, foi utilizado como referência o
            Tesouro Prefixado 2032, com taxa nominal de 13,48% a.a. na data de
            16/12/2025, resultando em uma rentabilidade líquida estimada de 11,74% a.a.,
            já descontado o IRRF.
          </p>

          <p>
            A rentabilidade real foi calculada utilizando a equação de Fisher,
            considerando o IPCA acumulado dos últimos 12 meses (4,87%), conforme dados
            do IBGE na data de 16/12/2025.
          </p>

          <p>
            Para estimativas de retorno com aluguéis residenciais, foi utilizado o
            Índice FipeZap referente ao mês de novembro de 2025.
          </p>

          <p>
            Os valores de renda apresentados já consideram a preservação do poder de
            compra do capital investido, descontando a inflação (IPCA). Esse conceito é
            conhecido como <strong>Taxa Segura de Retirada (TSR)</strong>.
          </p>

          <p>
            Existem diversas outras estratégias de alocação de ativos que não estão
            contempladas nesta simulação. Os exemplos utilizados foram simplificados
            intencionalmente para fins educativos.
          </p>
          
          <p>
            É importante destacar que o valor destinado a imóveis nesta simulação pode 
            não refletir exatamente a realidade. Os preços dos imóveis variam bastante 
            de uma região para outra. Por exemplo, se você possui um patrimônio de R$ 500 mil 
            e decide alocar 10% em imóveis, isso representaria R$ 50 mil — um valor que, 
            na prática, dificilmente seria suficiente para a compra de um imóvel residencial.
          </p>
          
        </div>

    </div>
  );
}
