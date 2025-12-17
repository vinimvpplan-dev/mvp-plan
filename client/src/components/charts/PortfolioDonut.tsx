import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface PortfolioDonutProps {
  imoveis: number;
  financeiro: number;
}

export function PortfolioDonut({ imoveis, financeiro }: PortfolioDonutProps) {
  const data = [
    { name: "Imóveis", value: imoveis, color: "var(--chart-1)" },
    { name: "Financeiro", value: financeiro, color: "var(--chart-2)" },
  ];

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            itemStyle={{ color: '#333', fontWeight: 500 }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm text-muted-foreground font-medium">Patrimônio</span>
        <span className="text-2xl font-bold text-primary">Total</span>
      </div>
    </div>
  );
}
