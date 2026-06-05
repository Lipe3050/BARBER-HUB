import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type DiaCalendario = {
  dia: string;
  disponivel: boolean;
};

type Agendamento = {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  observacao: string;
  status: string;
};

const diasJunho2026: DiaCalendario[] = [
  { dia: "1", disponivel: true },
  { dia: "2", disponivel: true },
  { dia: "3", disponivel: true },
  { dia: "4", disponivel: false },
  { dia: "5", disponivel: true },
  { dia: "6", disponivel: true },
  { dia: "7", disponivel: false },

  { dia: "8", disponivel: true },
  { dia: "9", disponivel: true },
  { dia: "10", disponivel: true },
  { dia: "11", disponivel: true },
  { dia: "12", disponivel: true },
  { dia: "13", disponivel: true },
  { dia: "14", disponivel: false },

  { dia: "15", disponivel: true },
  { dia: "16", disponivel: true },
  { dia: "17", disponivel: true },
  { dia: "18", disponivel: true },
  { dia: "19", disponivel: true },
  { dia: "20", disponivel: true },
  { dia: "21", disponivel: false },

  { dia: "22", disponivel: true },
  { dia: "23", disponivel: true },
  { dia: "24", disponivel: true },
  { dia: "25", disponivel: true },
  { dia: "26", disponivel: true },
  { dia: "27", disponivel: true },
  { dia: "28", disponivel: false },

  { dia: "29", disponivel: true },
  { dia: "30", disponivel: true },
];

const horariosPorPeriodo = {
  manha: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
  tarde: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
  noite: ["17:00", "17:30"],
};

async function pedirPermissaoNotificacao() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permissão necessária",
      "Para receber lembretes, permita as notificações do aplicativo."
    );
    return false;
  }

  return true;
}

async function criarLembreteTeste(
  nome: string,
  servico: string,
  horario: string
) {
  const permissao = await pedirPermissaoNotificacao();

  if (!permissao) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Lembrete BARBER HUB 💈",
      body: `Olá, ${nome}! Seu horário para ${servico} está marcado para ${horario}.`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
}

export default function AgendarScreen() {
  const params = useLocalSearchParams();

  const servicoRecebido =
    typeof params.servico === "string" ? params.servico : "";

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico] = useState(servicoRecebido);

  const [diaSelecionado, setDiaSelecionado] = useState("5");

  const [periodoSelecionado, setPeriodoSelecionado] = useState<
    "manha" | "tarde" | "noite"
  >("tarde");

  const [horarioSelecionado, setHorarioSelecionado] = useState("13:00");

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  const horariosDisponiveis = useMemo(() => {
    return horariosPorPeriodo[periodoSelecionado];
  }, [periodoSelecionado]);

  async function carregarHorariosOcupados() {
    const diaFormatado = diaSelecionado.padStart(2, "0");
    const dataCompleta = `${diaFormatado}/06/2026`;

    const agendamentosSalvos = await AsyncStorage.getItem(
      "@barberhub:agendamentos"
    );

    const listaAgendamentos: Agendamento[] = agendamentosSalvos
      ? JSON.parse(agendamentosSalvos)
      : [];

    const ocupados = listaAgendamentos
      .filter(
        (agendamento) =>
          agendamento.data === dataCompleta &&
          agendamento.status === "Confirmado"
      )
      .map((agendamento) => agendamento.horario);

    setHorariosOcupados(ocupados);

    if (ocupados.includes(horarioSelecionado)) {
      setHorarioSelecionado("");
    }
  }

  useEffect(() => {
    carregarHorariosOcupados();
  }, [diaSelecionado, periodoSelecionado]);

  function selecionarPeriodo(periodo: "manha" | "tarde" | "noite") {
    setPeriodoSelecionado(periodo);
    setHorarioSelecionado("");
  }

  async function confirmarAgendamento() {
    if (!nome || !telefone || !servico || !diaSelecionado || !horarioSelecionado) {
      Alert.alert(
        "Atenção",
        "Preencha nome, telefone, selecione o dia e escolha um horário."
      );
      return;
    }

    const diaFormatado = diaSelecionado.padStart(2, "0");
    const dataCompleta = `${diaFormatado}/06/2026`;

    const novoAgendamento = {
      id: String(new Date().getTime()),
      nome,
      telefone,
      servico,
      data: dataCompleta,
      horario: horarioSelecionado,
      observacao: "",
      status: "Confirmado",
    };

    const agendamentosSalvos = await AsyncStorage.getItem(
      "@barberhub:agendamentos"
    );

    const listaAgendamentos: Agendamento[] = agendamentosSalvos
      ? JSON.parse(agendamentosSalvos)
      : [];

    const horarioJaExiste = listaAgendamentos.some(
      (agendamento) =>
        agendamento.data === dataCompleta &&
        agendamento.horario === horarioSelecionado &&
        agendamento.status === "Confirmado"
    );

    if (horarioJaExiste) {
      Alert.alert(
        "Horário indisponível",
        "Já existe um agendamento confirmado para essa data e horário."
      );

      await carregarHorariosOcupados();
      return;
    }

    listaAgendamentos.push(novoAgendamento);

    await AsyncStorage.setItem(
      "@barberhub:agendamentos",
      JSON.stringify(listaAgendamentos)
    );

    await criarLembreteTeste(nome, servico, horarioSelecionado);

    Alert.alert(
      "Sucesso",
      "Agendamento realizado com sucesso! Você receberá um lembrete em alguns segundos."
    );

    setNome("");
    setTelefone("");

    router.push("/meus-agendamentos");
  }

  return (
    <KeyboardAvoidingView
      style={styles.areaPrincipal}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.modal}>
          <View style={styles.topo}>
            <View style={{ width: 32 }} />

            <Text style={styles.titulo}>Data do agendamento</Text>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.fechar}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.servicoTexto}>
            Serviço: {servico || "Nenhum serviço selecionado"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do cliente"
            placeholderTextColor="#8E8E8E"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#8E8E8E"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <View style={styles.mesArea}>
            <Text style={styles.seta}>‹</Text>
            <Text style={styles.mes}>Junho 2026</Text>
            <Text style={styles.seta}>›</Text>
          </View>

          <View style={styles.diasSemana}>
            <Text style={styles.diaSemana}>Seg</Text>
            <Text style={styles.diaSemana}>Ter</Text>
            <Text style={styles.diaSemana}>Qua</Text>
            <Text style={styles.diaSemana}>Qui</Text>
            <Text style={styles.diaSemana}>Sex</Text>
            <Text style={styles.diaSemana}>Sáb</Text>
            <Text style={styles.diaSemana}>Dom</Text>
          </View>

          <View style={styles.calendario}>
            {diasJunho2026.map((item) => {
              const selecionado = item.dia === diaSelecionado;

              return (
                <TouchableOpacity
                  key={item.dia}
                  style={styles.diaContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (!item.disponivel) {
                      Alert.alert(
                        "Dia indisponível",
                        "Esse dia não está disponível para agendamento."
                      );
                      return;
                    }

                    setDiaSelecionado(item.dia);
                    setHorarioSelecionado("");
                  }}
                >
                  <View
                    style={[
                      styles.diaCirculo,
                      selecionado && styles.diaCirculoSelecionado,
                    ]}
                  >
                    <Text
                      style={[
                        styles.diaNumero,
                        selecionado && styles.diaNumeroSelecionado,
                      ]}
                    >
                      {item.dia}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.pontoDisponibilidade,
                      item.disponivel
                        ? styles.pontoVerde
                        : styles.pontoVermelho,
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.subtituloHorario}>Escolha o melhor horário</Text>

          <View style={styles.periodos}>
            <TouchableOpacity
              style={[
                styles.periodoBotao,
                periodoSelecionado === "manha" && styles.periodoBotaoAtivo,
              ]}
              onPress={() => selecionarPeriodo("manha")}
            >
              <Text
                style={[
                  styles.periodoTexto,
                  periodoSelecionado === "manha" && styles.periodoTextoAtivo,
                ]}
              >
                Manhã
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodoBotao,
                periodoSelecionado === "tarde" && styles.periodoBotaoAtivo,
              ]}
              onPress={() => selecionarPeriodo("tarde")}
            >
              <Text
                style={[
                  styles.periodoTexto,
                  periodoSelecionado === "tarde" && styles.periodoTextoAtivo,
                ]}
              >
                Tarde
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodoBotao,
                periodoSelecionado === "noite" && styles.periodoBotaoAtivo,
              ]}
              onPress={() => selecionarPeriodo("noite")}
            >
              <Text
                style={[
                  styles.periodoTexto,
                  periodoSelecionado === "noite" && styles.periodoTextoAtivo,
                ]}
              >
                Noite
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horariosArea}>
            {horariosDisponiveis.map((hora) => {
              const selecionado = hora === horarioSelecionado;
              const ocupado = horariosOcupados.includes(hora);

              return (
                <TouchableOpacity
                  key={hora}
                  style={[
                    styles.horarioBotao,
                    selecionado && styles.horarioBotaoSelecionado,
                    ocupado && styles.horarioBotaoOcupado,
                  ]}
                  disabled={ocupado}
                  onPress={() => setHorarioSelecionado(hora)}
                >
                  <Text
                    style={[
                      styles.horarioTexto,
                      selecionado && styles.horarioTextoSelecionado,
                      ocupado && styles.horarioTextoOcupado,
                    ]}
                  >
                    {ocupado ? `${hora} ocupado` : hora}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.botaoContinuar}
            onPress={confirmarAgendamento}
          >
            <Text style={styles.textoBotaoContinuar}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  areaPrincipal: {
    flex: 1,
    backgroundColor: "#000000",
  },

  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    padding: 18,
    paddingBottom: 30,
  },

  modal: {
    backgroundColor: "#000000",
    borderRadius: 28,
    paddingTop: 14,
    paddingBottom: 20,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "400",
    textAlign: "center",
    flex: 1,
  },

  fechar: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  servicoTexto: {
    color: "#EDE8B5",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
  },

  mesArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 18,
    paddingHorizontal: 10,
  },

  seta: {
    color: "#F1EDBE",
    fontSize: 34,
    fontWeight: "bold",
    width: 32,
    textAlign: "center",
  },

  mes: {
    color: "#F1EDBE",
    fontSize: 22,
    fontWeight: "bold",
  },

  diasSemana: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  diaSemana: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    width: "14.2%",
    textAlign: "center",
  },

  calendario: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },

  diaContainer: {
    width: "14.2%",
    alignItems: "center",
    marginBottom: 14,
  },

  diaCirculo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  diaCirculoSelecionado: {
    backgroundColor: "#F1EDBE",
  },

  diaNumero: {
    color: "#EAEAEA",
    fontSize: 18,
    fontWeight: "bold",
  },

  diaNumeroSelecionado: {
    color: "#000000",
  },

  pontoDisponibilidade: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },

  pontoVerde: {
    backgroundColor: "#08A117",
  },

  pontoVermelho: {
    backgroundColor: "#D60000",
  },

  subtituloHorario: {
    color: "#FFFFFF",
    fontSize: 22,
    marginBottom: 16,
  },

  periodos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  periodoBotao: {
    width: "31.5%",
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  periodoBotaoAtivo: {
    borderColor: "#F1EDBE",
  },

  periodoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  periodoTextoAtivo: {
    color: "#F1EDBE",
  },

  horariosArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  horarioBotao: {
    width: "31.5%",
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  horarioBotaoSelecionado: {
    borderColor: "#F1EDBE",
  },

  horarioBotaoOcupado: {
    backgroundColor: "#111111",
    borderColor: "#3A3A3A",
    opacity: 0.45,
  },

  horarioTexto: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  horarioTextoSelecionado: {
    color: "#F1EDBE",
    fontWeight: "bold",
  },

  horarioTextoOcupado: {
    color: "#777777",
    fontSize: 13,
  },

  botaoContinuar: {
    backgroundColor: "#F1EDBE",
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 6,
  },

  textoBotaoContinuar: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "500",
  },
});