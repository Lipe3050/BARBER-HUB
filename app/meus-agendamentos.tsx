import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Agendamento,
  cancelarAgendamento,
  listarAgendamentos,
} from "../src/services/agendamentosService";

export default function MeusAgendamentosScreen() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarAgendamentos() {
    try {
      setCarregando(true);

      const dados = await listarAgendamentos();

      setAgendamentos(dados);
    } catch (error: any) {
      console.log("ERRO AO CARREGAR AGENDAMENTOS:", error);

      Alert.alert(
        "Erro",
        error.message || "Não foi possível carregar os agendamentos."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function cancelar(id?: string) {
    if (!id) {
      Alert.alert("Erro", "Agendamento inválido.");
      return;
    }

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
            try {
              await cancelarAgendamento(id);

              Alert.alert("Pronto", "Agendamento cancelado com sucesso.");

              carregarAgendamentos();
            } catch (error: any) {
              console.log("ERRO AO CANCELAR:", error);

              Alert.alert(
                "Erro",
                error.message || "Não foi possível cancelar o agendamento."
              );
            }
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
        Acompanhe seus horários marcados na barbearia.
      </Text>

      {carregando ? (
        <View style={styles.areaCarregando}>
          <ActivityIndicator size="large" color="#F1EDBE" />
          <Text style={styles.textoCarregando}>Carregando agendamentos...</Text>
        </View>
      ) : agendamentos.length === 0 ? (
        <View style={styles.cardVazio}>
          <Text style={styles.textoVazio}>
            Nenhum agendamento encontrado no momento.
          </Text>
        </View>
      ) : (
        agendamentos.map((agendamento) => (
          <View key={agendamento.id} style={styles.card}>
            <View style={styles.topoCard}>
              <Text style={styles.nome}>{agendamento.nome}</Text>

              <View
                style={[
                  styles.statusBox,
                  agendamento.status === "Cancelado"
                    ? styles.statusCanceladoBox
                    : styles.statusConfirmadoBox,
                ]}
              >
                <Text
                  style={[
                    styles.statusTexto,
                    agendamento.status === "Cancelado"
                      ? styles.statusCanceladoTexto
                      : styles.statusConfirmadoTexto,
                  ]}
                >
                  {agendamento.status}
                </Text>
              </View>
            </View>

            <Text style={styles.info}>Telefone: {agendamento.telefone}</Text>
            <Text style={styles.info}>Serviço: {agendamento.servico}</Text>
            <Text style={styles.info}>Data: {agendamento.data}</Text>
            <Text style={styles.info}>Horário: {agendamento.horario}</Text>

            {agendamento.observacao ? (
              <Text style={styles.info}>
                Observação: {agendamento.observacao}
              </Text>
            ) : null}

            {agendamento.status === "Confirmado" && (
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => cancelar(agendamento.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoCancelar}>
                  Cancelar agendamento
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    padding: 24,
    paddingBottom: 110,
  },

  titulo: {
    color: "#F1EDBE",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },

  subtitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 24,
  },

  areaCarregando: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  textoCarregando: {
    color: "#CCCCCC",
    fontSize: 15,
    marginTop: 12,
  },

  cardVazio: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  textoVazio: {
    color: "#CCCCCC",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
  },

  card: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  topoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },

  nome: {
    color: "#F1EDBE",
    fontSize: 21,
    fontWeight: "bold",
    flex: 1,
  },

  statusBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusConfirmadoBox: {
    backgroundColor: "#123D1A",
  },

  statusCanceladoBox: {
    backgroundColor: "#4A1717",
  },

  statusTexto: {
    fontSize: 12,
    fontWeight: "bold",
  },

  statusConfirmadoTexto: {
    color: "#7CFC00",
  },

  statusCanceladoTexto: {
    color: "#FF7777",
  },

  info: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 7,
    lineHeight: 21,
  },

  botaoCancelar: {
    backgroundColor: "#E63946",
    padding: 14,
    borderRadius: 12,
    marginTop: 14,
  },

  textoBotaoCancelar: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});