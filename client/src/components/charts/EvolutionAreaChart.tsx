import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

interface EvolutionAreaChartProps {
  tempoMeses: number;
  aporteMensal: number;
  taxaMensal: number;
}

export function EvolutionAreaChart({ tempoMeses, aporteMensal, taxaMensal }: EvolutionAreaChartProps) {
  const data = useMemo(() => {
    const points = [];
    const steps = 50; // Reduzir pontos para performance
    const stepSize = Math.max(1, Math.floor(tempoMeses / steps));

    for (let mes = 0; mes <= tempoMeses; mes += stepSize) {
      // FV = PMT * ( ((1+i)^n - 1) / i )
      const totalAcumulado = aporteMensal * ( (Math.pow(1 + taxaMensal, mes) - 1) / taxaMensal );
      const totalAportado = aporteMensal * mes;
      const jurosAcumulados = totalAcumulado - totalAportado;

      points.push({
        mes,
        ano: Math.floor(mes / 12),
        totalAportado,
        jurosAcumulados,
        total: totalAcumulado
      });
    }
    return points;
  }, [tempoMeses, aporteMensal, taxaMensal]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: "compact" }).format(value);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorJuros" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAporte" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis 
            dataKey="ano" 
            tickFormatter={(val) => `${val} anos`}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `${label} anos`}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="totalAportado" 
            stackId="1" 
            stroke="var(--chart-2)" 
            fill="url(#colorAporte)" 
            name="Capital Aportado"
          />
          <Area 
            type="monotone" 
            dataKey="jurosAcumulados" 
            stackId="1" 
            stroke="var(--chart-1)" 
            fill="url(#colorJuros)" 
            name="Juros Acumulados"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
