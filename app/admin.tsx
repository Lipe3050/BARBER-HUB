import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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

export default function AdminScreen() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  async function carregarAgendamentos() {
    const dados = await AsyncStorage.getItem("@barberhub:agendamentos");

    if (dados) {
      setAgendamentos(JSON.parse(dados));
    } else {
      setAgendamentos([]);
    }
  }

  async function limparAgenda() {
    Alert.alert(
      "Limpar agenda",
      "Tem certeza que deseja apagar todos os agendamentos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar tudo",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("@barberhub:agendamentos");
            setAgendamentos([]);
            Alert.alert("Pronto", "Todos os agendamentos foram apagados.");
          },
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      carregarAgendamentos();
    }, [])
  );

  const totalAgendamentos = agendamentos.length;

  const confirmados = agendamentos.filter(
    (agendamento) => agendamento.status === "Confirmado"
  ).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Agenda da Barbearia</Text>

      <Text style={styles.subtitulo}>
        Área administrativa para acompanhar os horários marcados.
      </Text>

      <View style={styles.resumo}>
        <View style={styles.cardResumo}>
          <Text style={styles.numeroResumo}>{totalAgendamentos}</Text>
          <Text style={styles.textoResumo}>Total</Text>
        </View>

        <View style={styles.cardResumo}>
          <Text style={styles.numeroResumo}>{confirmados}</Text>
          <Text style={styles.textoResumo}>Confirmados</Text>
        </View>
      </View>

      {agendamentos.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparAgenda}>
          <Text style={styles.textoBotaoLimpar}>Limpar Agenda</Text>
        </TouchableOpacity>
      )}

      {agendamentos.length === 0 ? (
        <View style={styles.cardVazio}>
          <Text style={styles.textoVazio}>
            Nenhum agendamento cadastrado no momento.
          </Text>
        </View>
      ) : (
        agendamentos.map((agendamento) => (
          <View key={agendamento.id} style={styles.card}>
            <Text style={styles.nome}>{agendamento.nome}</Text>

            <Text style={styles.info}>Telefone: {agendamento.telefone}</Text>
            <Text style={styles.info}>Serviço: {agendamento.servico}</Text>
            <Text style={styles.info}>Data: {agendamento.data}</Text>
            <Text style={styles.info}>Horário: {agendamento.horario}</Text>

            {agendamento.observacao ? (
              <Text style={styles.info}>
                Observação: {agendamento.observacao}
              </Text>
            ) : null}

            <Text style={styles.status}>Status: {agendamento.status}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D4AF37",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },

  resumo: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  cardResumo: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },

  numeroResumo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D4AF37",
  },

  textoResumo: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 4,
  },

  botaoLimpar: {
    backgroundColor: "#E63946",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },

  textoBotaoLimpar: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  cardVazio: {
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },

  textoVazio: {
    color: "#CCCCCC",
    fontSize: 16,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333333",
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 6,
  },

  status: {
    fontSize: 15,
    color: "#7CFC00",
    fontWeight: "bold",
    marginTop: 8,
  },
});