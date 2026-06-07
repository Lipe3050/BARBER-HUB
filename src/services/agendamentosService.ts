import { supabase } from "../lib/supabase";

export type Agendamento = {
  id?: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  observacao?: string;
  status: string;
  created_at?: string;
};

export async function salvarAgendamento(agendamento: Agendamento) {
  const { data, error } = await supabase
    .from("agendamentos")
    .insert([
      {
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        servico: agendamento.servico,
        data: agendamento.data,
        horario: agendamento.horario,
        observacao: agendamento.observacao || "",
        status: agendamento.status,
      },
    ])
    .select();

  if (error) {
    console.log("ERRO SUPABASE AO SALVAR:", error);

    if (error.code === "23505") {
      throw new Error(
        "Esse horário acabou de ser reservado por outro cliente. Escolha outro horário disponível."
      );
    }

    throw new Error(
      "Não foi possível salvar o agendamento. Verifique sua conexão com a internet."
    );
  }

  return data;
}

export async function listarAgendamentos() {
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("ERRO SUPABASE AO LISTAR:", error);

    throw new Error(
      "Não foi possível carregar os agendamentos do banco online."
    );
  }

  return data as Agendamento[];
}

export async function listarHorariosOcupados(dataAgendamento: string) {
  const { data, error } = await supabase
    .from("agendamentos")
    .select("horario")
    .eq("data", dataAgendamento)
    .eq("status", "Confirmado");

  if (error) {
    console.log("ERRO SUPABASE AO BUSCAR HORÁRIOS:", error);

    throw new Error(
      "Não foi possível carregar os horários ocupados do banco online."
    );
  }

  return data.map((item) => item.horario);
}

export async function cancelarAgendamento(id: string) {
  const { error } = await supabase
    .from("agendamentos")
    .update({ status: "Cancelado" })
    .eq("id", id);

  if (error) {
    console.log("ERRO SUPABASE AO CANCELAR:", error);

    throw new Error(
      "Não foi possível cancelar o agendamento no banco online."
    );
  }
}

export async function limparAgenda() {
  const { error } = await supabase
    .from("agendamentos")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    console.log("ERRO SUPABASE AO LIMPAR:", error);

    throw new Error("Não foi possível limpar a agenda no banco online.");
  }
}