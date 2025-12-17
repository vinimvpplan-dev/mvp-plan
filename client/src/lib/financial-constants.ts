export interface FipeZapCity {
  ordem: number;
  cidade: string;
  uf: string;
  tipo: string;
  indice: number;
}

export const FIPEZAP_DATA: FipeZapCity[] = [
  { ordem: 1, cidade: "Belém", uf: "PA", tipo: "Capital", indice: 8.62 },
  { ordem: 2, cidade: "Santos", uf: "SP", tipo: "Demais cidades", indice: 8.56 },
  { ordem: 3, cidade: "Recife", uf: "PE", tipo: "Capital", indice: 8.36 },
  { ordem: 4, cidade: "Cuiabá", uf: "MT", tipo: "Capital", indice: 8.03 },
  { ordem: 5, cidade: "Campinas", uf: "SP", tipo: "Demais cidades", indice: 7.94 },
  { ordem: 6, cidade: "Praia Grande", uf: "SP", tipo: "Demais cidades", indice: 7.93 },
  { ordem: 7, cidade: "Manaus", uf: "AM", tipo: "Capital", indice: 7.82 },
  { ordem: 8, cidade: "Natal", uf: "RN", tipo: "Capital", indice: 7.48 },
  { ordem: 9, cidade: "Ribeirão Preto", uf: "SP", tipo: "Demais cidades", indice: 7.47 },
  { ordem: 10, cidade: "São Luís", uf: "MA", tipo: "Capital", indice: 7.46 },
  { ordem: 11, cidade: "Barueri", uf: "SP", tipo: "Demais cidades", indice: 7.21 },
  { ordem: 12, cidade: "Salvador", uf: "BA", tipo: "Capital", indice: 7.12 },
  { ordem: 13, cidade: "Porto Alegre", uf: "RS", tipo: "Capital", indice: 6.88 },
  { ordem: 14, cidade: "João Pessoa", uf: "PB", tipo: "Capital", indice: 6.71 },
  { ordem: 15, cidade: "Guarulhos", uf: "SP", tipo: "Demais cidades", indice: 6.65 },
  { ordem: 16, cidade: "São José do Rio Preto", uf: "SP", tipo: "Demais cidades", indice: 6.63 },
  { ordem: 17, cidade: "Maceió", uf: "AL", tipo: "Capital", indice: 6.6 },
  { ordem: 18, cidade: "Brasília", uf: "DF", tipo: "Capital", indice: 6.31 },
  { ordem: 19, cidade: "Aracaju", uf: "SE", tipo: "Capital", indice: 6.26 },
  { ordem: 20, cidade: "São Paulo", uf: "SP", tipo: "Capital", indice: 6.26 },
  { ordem: 21, cidade: "São Bernardo do Campo", uf: "SP", tipo: "Demais cidades", indice: 6.24 },
  { ordem: 22, cidade: "Santo André", uf: "SP", tipo: "Demais cidades", indice: 6.18 },
  { ordem: 23, cidade: "Teresina", uf: "PI", tipo: "Capital", indice: 6.12 },
  { ordem: 24, cidade: "Pelotas", uf: "RS", tipo: "Demais cidades", indice: 6.05 },
  { ordem: 25, cidade: "Goiânia", uf: "GO", tipo: "Capital", indice: 6.04 },
  { ordem: 26, cidade: "São José dos Campos", uf: "SP", tipo: "Demais cidades", indice: 5.92 },
  { ordem: 27, cidade: "Rio de Janeiro", uf: "RJ", tipo: "Capital", indice: 5.87 },
  { ordem: 28, cidade: "Florianópolis", uf: "SC", tipo: "Capital", indice: 5.66 },
  { ordem: 29, cidade: "Campo Grande", uf: "MS", tipo: "Capital", indice: 5.65 },
  { ordem: 30, cidade: "São José", uf: "SC", tipo: "Demais cidades", indice: 5.61 },
  { ordem: 31, cidade: "Niterói", uf: "RJ", tipo: "Demais cidades", indice: 5.47 },
  { ordem: 32, cidade: "Joinville", uf: "SC", tipo: "Demais cidades", indice: 5.4 },
  { ordem: 33, cidade: "Belo Horizonte", uf: "MG", tipo: "Capital", indice: 5.07 },
  { ordem: 34, cidade: "Fortaleza", uf: "CE", tipo: "Capital", indice: 4.62 },
  { ordem: 35, cidade: "Curitiba", uf: "PR", tipo: "Capital", indice: 4.52 },
  { ordem: 36, cidade: "Vitória", uf: "ES", tipo: "Capital", indice: 4.25 }
];

export const FINANCIAL_CONSTANTS = {
  IPCA_12M: 0.0487, // 4.87%
  TESOURO_PREFIXADO_BRUTO: 0.1348, // 13.48%
  TESOURO_PREFIXADO_LIQUIDO: 0.1174, // 11.74%
  TAXA_REAL_IMOVEIS: 0.0687, // 6.87% (1.0687)
};

// Equação de Fisher: Taxa Real = ((1 + Nominal) / (1 + Inflação)) - 1
export const TAXA_REAL_JUROS = ((1 + FINANCIAL_CONSTANTS.TESOURO_PREFIXADO_LIQUIDO) / (1 + FINANCIAL_CONSTANTS.IPCA_12M)) - 1;
// Resultado esperado: ~0.0655 (6.55%)
