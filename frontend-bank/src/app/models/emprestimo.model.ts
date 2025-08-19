export interface Emprestimo {
    id: number;                  // Identificador único
    clienteId: number;           // Relação com o Cliente
    dataEmprestimo: Date;        // Data do início do empréstimo
    moeda: string;               // Código da moeda (ex: "USD", "EUR") conforme lista do Banco Central
    valorObtidoEmprestimo: number;         // Valor obtido na moeda original
    taxaConversao: number;       // Taxa de conversão para BRL na data atual
    dataVencimentoEmprestimo: Date;        // Data de vencimento do pagamento
    taxaJurosMensal: number;
    valorTotal: number;
}
