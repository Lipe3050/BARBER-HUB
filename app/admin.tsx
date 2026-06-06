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
  limparAgenda,
  listarAgendamentos,
} from "../src/services/agendamentosService";

export default function AdminScreen() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [limpando, setLimpando] = useState(false);

  async function carregarAgendamentos() {
    try {
      setCarregando(true);

      const dados = await listarAgendamentos();

      setAgendamentos(dados);
    } catch (error: any) {
      console.log("ERRO AO CARREGAR AGENDA ADMIN:", error);

      Alert.alert(
        "Erro",
        error.message || "Não foi possível carregar a agenda da barbearia."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarLimpeza() {
    if (agendamentos.length === 0) {
      Alert.alert("Agenda vazia", "Não existem agendamentos para apagar.");
      return;
    }

    Alert.alert(
      "Limpar agenda",
      "Tem certeza que deseja apagar todos os agendamentos do banco online?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar tudo",
          style: "destructive",
          onPress: async () => {
            try {
              setLimpando(true);

              await limparAgenda();

              Alert.alert("Pronto", "Todos os agendamentos foram apagados.");

              carregarAgendamentos();
            } catch (error: any) {
              console.log("ERRO AO LIMPAR AGENDA:", error);

              Alert.alert(
                "Erro",
                error.message || "Não foi possível limpar a agenda."
              );
            } finally {
              setLimpando(false);
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

  const totalAgendamentos = agendamentos.length;

  const confirmados = agendamentos.filter(
    (agendamento) => agendamento.status === "Confirmado"
  ).length;

  const cancelados = agendamentos.filter(
    (agendamento) => agendamento.status === "Cancelado"
  ).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Agenda da Barbearia</Text>

      <Text style={styles.subtitulo}>
        Área administrativa para acompanhar todos os horários marcados no banco
        online.
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

        <View style={styles.cardResumo}>
          <Text style={styles.numeroResumo}>{cancelados}</Text>
          <Text style={styles.textoResumo}>Cancelados</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.botaoAtualizar, carregando && styles.botaoDesativado]}
        onPress={carregarAgendamentos}
        disabled={carregando}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoAtualizar}>
          {carregando ? "Atualizando..." : "Atualizar agenda"}
        </Text>
      </TouchableOpacity>

      {agendamentos.length > 0 && (
        <TouchableOpacity
          style={[styles.botaoLimpar, limpando && styles.botaoDesativado]}
          onPress={confirmarLimpeza}
          disabled={limpando}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoLimpar}>
            {limpando ? "Limpando..." : "Limpar Agenda"}
          </Text>
        </TouchableOpacity>
      )}

      {carregando ? (
        <View style={styles.areaCarregando}>
          <ActivityIndicator size="large" color="#F1EDBE" />
          <Text style={styles.textoCarregando}>Carregando agenda...</Text>
        </View>
      ) : agendamentos.length === 0 ? (
        <View style={styles.cardVazio}>
          <Text style={styles.textoVazio}>
            Nenhum agendamento cadastrado no momento.
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#F1EDBE",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 23,
  },

  resumo: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  cardResumo: {
    flex: 1,
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  numeroResumo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F1EDBE",
  },

  textoResumo: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },

  botaoAtualizar: {
    backgroundColor: "#F1EDBE",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  textoBotaoAtualizar: {
    color: "#000000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoLimpar: {
    backgroundColor: "#E63946",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
  },

  textoBotaoLimpar: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoDesativado: {
    opacity: 0.6,
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
    fontSize: 21,
    fontWeight: "bold",
    color: "#F1EDBE",
    flex: 1,
  },

  info: {
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 7,
    lineHeight: 21,
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
});