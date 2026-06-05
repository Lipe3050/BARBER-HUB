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

export default function MeusAgendamentosScreen() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  async function carregarAgendamentos() {
    const dados = await AsyncStorage.getItem("@barberhub:agendamentos");

    if (dados) {
      setAgendamentos(JSON.parse(dados));
    } else {
      setAgendamentos([]);
    }
  }

  async function cancelarAgendamento(id: string) {
    Alert.alert(
      "Cancelar agendamento",
      "Tem certeza que deseja cancelar este agendamento?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: async () => {
            const novaLista = agendamentos.filter(
              (agendamento) => agendamento.id !== id
            );

            await AsyncStorage.setItem(
              "@barberhub:agendamentos",
              JSON.stringify(novaLista)
            );

            setAgendamentos(novaLista);

            Alert.alert("Pronto", "Agendamento cancelado com sucesso.");
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Meus Agendamentos</Text>

      <Text style={styles.subtitulo}>
        Veja abaixo os horários marcados no BARBER HUB.
      </Text>

      {agendamentos.length === 0 ? (
        <View style={styles.cardVazio}>
          <Text style={styles.textoVazio}>
            Nenhum agendamento encontrado.
          </Text>
        </View>
      ) : (
        agendamentos.map((agendamento) => (
          <View key={agendamento.id} style={styles.card}>
            <Text style={styles.nome}>{agendamento.nome}</Text>

            <Text style={styles.info}>
              Serviço: {agendamento.servico}
            </Text>

            <Text style={styles.info}>
              Telefone: {agendamento.telefone}
            </Text>

            <Text style={styles.info}>
              Data: {agendamento.data}
            </Text>

            <Text style={styles.info}>
              Horário: {agendamento.horario}
            </Text>

            {agendamento.observacao ? (
              <Text style={styles.info}>
                Observação: {agendamento.observacao}
              </Text>
            ) : null}

            <Text style={styles.status}>
              Status: {agendamento.status}
            </Text>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => cancelarAgendamento(agendamento.id)}
            >
              <Text style={styles.textoBotaoCancelar}>
                Cancelar Agendamento
              </Text>
            </TouchableOpacity>
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
    marginBottom: 14,
  },

  botaoCancelar: {
    backgroundColor: "#E63946",
    padding: 14,
    borderRadius: 10,
  },

  textoBotaoCancelar: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});