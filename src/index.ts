import type { Especialidade } from "./types/especialidade";
import type { Paciente } from "./types/paciente";
import type { StatusConsulta } from "./types/statusConsulta";
import type { Medico } from "./interfaces/medico";
import type { Consulta } from "./interfaces/consulta";

// Especialidades
const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};
const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};
const pediatria: Especialidade = {
  id: 3,
  nome: "Pediatria",
};
// Médicos
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
const medico2: Medico = {
  id: 2,
  nome: "Dra. Ana Paula Costa",
  crm: "CRM54321",
  especialidade: ortopedia,
  ativo: true,
};
const medico3: Medico = {
  id: 3,
  nome: "Dr. João Mendes",
  crm: "CRM98765",
  especialidade: pediatria,
  ativo: true,
};
// Pacientes
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};
const paciente2: Paciente = {
  id: 2,
  nome: "Maria Silva",
  cpf: "987.654.321-00",
  email: "maria@email.com",
  telefone: "(11) 98765-4321",
};
const paciente3: Paciente = {
  id: 3,
  nome: "Pedro Santos",
  cpf: "456.789.123-00",
  email: "pedro@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "cancelada",
  };
}

function exibirConsulta(consulta: Consulta): string {
  const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}

function listarConsultasPorStatus(consultas: Consulta[],status: StatusConsulta): Consulta[] {
    return consultas.filter((consulta) => consulta.status === status);
}


function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // Zera horas para comparar apenas a data
  return consultas.filter((consulta) => consulta.data >= hoje);
}

function alterarStatusConsulta(consulta: Consulta, novoStatus: StatusConsulta): Consulta {
    return {
        ...consulta,
        status: novoStatus,
    }
}

//=== ARRAY TIPADO DE CONSULTAS ===
const consultas: Consulta[] = [];

let consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date(),
  350
);

consulta1 = confirmarConsulta(consulta1);

let consulta2 = criarConsulta(
  2,
  medico2,
  paciente2,
  new Date(),
  400
);

let consulta3 = criarConsulta(
  3,
  medico3,
  paciente3,
  new Date(),
  500
);

consulta3 = alterarStatusConsulta(consulta3, "realizada");

let consulta4 = criarConsulta(
    4,
    medico3,
    paciente1,
    new Date(),
    120
);

consulta4 = alterarStatusConsulta(consulta4, "cancelada");


consultas.push(consulta1,  consulta2, consulta3, consulta4);

console.log("=== LISTAR CONSULTAS POR STATUS ===");
for (const consulta of listarConsultasPorStatus(consultas, "confirmada")) {
    console.log(exibirConsulta(consulta))
}

console.log("=== LISTAR CONSULTAS FUTURAS ===");

for (const consulta of listarConsultasFuturas(consultas)) {
    console.log(exibirConsulta(consulta))
}

console.log("=== FATURAMENTO TOTAL ===");

function calcularFaturamento(consultas: Consulta[]): number {
    return consultas
        .filter((consulta) => consulta.status === "realizada")
        .reduce((total, consulta) => total + consulta.valor, 0);
}

const faturamento = calcularFaturamento(consultas);

console.log(`Faturamento total: R$ ${faturamento.toFixed(2)}`)