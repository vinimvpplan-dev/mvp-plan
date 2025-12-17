import { useMemo } from 'react';
import { FINANCIAL_CONSTANTS, TAXA_REAL_JUROS, FIPEZAP_DATA } from '@/lib/financial-constants';

interface FinancialInputs {
  aporteMensal: number;
  salarioDesejado: number;
  porcentualImoveis: number; // 0 to 1
  cidadeSelecionada: string;
}

export interface FinancialResults {
  patrimonioNecessario: number;
  tempoAnos: number;
  tempoMesesTotal: number;
  totalAportado: number;
  totalJuros: number;
  rendaPassivaMensal: number;
  patrimonioImoveis: number;
  patrimonioFinanceiro: number;
  taxaMensalComposta: number;
}

export function useFinancialCalculations(inputs: FinancialInputs): FinancialResults {
  return useMemo(() => {
    const { aporteMensal, salarioDesejado, porcentualImoveis, cidadeSelecionada } = inputs;
    const porcentualFinanceiro = 1 - porcentualImoveis;

    // Buscar índice FipeZap da cidade
    const cidadeData = FIPEZAP_DATA.find(c => c.cidade === cidadeSelecionada);
    const indiceFipeZap = cidadeData ? cidadeData.indice : 5.94; // Default para média se não encontrar

    // Taxas Mensais
    const taxaImoveisMensal = indiceFipeZap / 100 / 12;
    const taxaFinanceiraRealMensal = Math.pow(1 + FINANCIAL_CONSTANTS.TAXA_REAL_IMOVEIS, 1 / 12) - 1;
    
    // Cálculo do Patrimônio Necessário (B12)
    // Fórmula: Salário / ( (%Imóveis / TaxaImóveis) + (%Financeiro / TaxaFinanceira) )
    const denominador = (porcentualImoveis / taxaImoveisMensal) + (porcentualFinanceiro / taxaFinanceiraRealMensal);
    const patrimonioNecessario = salarioDesejado * denominador;

    // Taxa de Juros Compostos Mensal para Acumulação (Baseada na Taxa Real Geral)
    const taxaAcumulacaoMensal = Math.pow(1 + TAXA_REAL_JUROS, 1 / 12) - 1;

    // Cálculo do Tempo (NPER)
    // NPER = log( (PMT * (1 + i) / FV * i) + 1 ) / log(1 + i)  <-- Fórmula aproximada
    // Excel NPER: NPER(rate, pmt, pv, fv, type)
    // Aqui: rate = taxaAcumulacaoMensal, pmt = -aporteMensal, pv = 0, fv = patrimonioNecessario
    
    // Usando fórmula matemática para NPER com PV=0:
    // n = ln( (FV * i / PMT) + 1 ) / ln(1 + i)
    // Nota: PMT aqui entra positivo na fórmula matemática padrão de juros compostos para atingir FV
    
    let tempoMesesTotal = 0;
    if (aporteMensal > 0 && patrimonioNecessario > 0) {
      try {
        const numeradorLog = Math.log((patrimonioNecessario * taxaAcumulacaoMensal / aporteMensal) + 1);
        const denominadorLog = Math.log(1 + taxaAcumulacaoMensal);
        tempoMesesTotal = numeradorLog / denominadorLog;
      } catch (e) {
        tempoMesesTotal = 0;
      }
    }

    const tempoAnos = tempoMesesTotal / 12;

    // Totais
    const totalAportado = aporteMensal * tempoMesesTotal;
    const totalJuros = patrimonioNecessario - totalAportado;

    // Divisão do Patrimônio
    const patrimonioImoveis = patrimonioNecessario * porcentualImoveis;
    const patrimonioFinanceiro = patrimonioNecessario * porcentualFinanceiro;

    return {
      patrimonioNecessario,
      tempoAnos,
      tempoMesesTotal,
      totalAportado,
      totalJuros,
      rendaPassivaMensal: salarioDesejado,
      patrimonioImoveis,
      patrimonioFinanceiro,
      taxaMensalComposta: taxaAcumulacaoMensal
    };
  }, [inputs]);
}
