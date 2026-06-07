import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconeArea}>
        <Ionicons name="calendar-outline" size={54} color="#F1EDBE" />
      </View>

      <Text style={styles.titulo}>Minha Agenda</Text>

      <Text style={styles.texto}>
        Consulte seus horários marcados, acompanhe o status do agendamento e
        cancele caso não possa comparecer.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/meus-agendamentos")}
        activeOpacity={0.8}
      >
        <Ionicons name="clipboard-outline" size={22} color="#000000" />
        <Text style={styles.textoBotao}>Ver meus agendamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => router.push("/servicos")}
        activeOpacity={0.8}
      >
        <Ionicons name="cut-outline" size={22} color="#F1EDBE" />
        <Text style={styles.textoBotaoSecundario}>Agendar novo horário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    padding: 24,
  },

  iconeArea: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  titulo: {
    color: "#F1EDBE",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },

  texto: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
  },

  botao: {
    backgroundColor: "#F1EDBE",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoBotao: {
    color: "#000000",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  botaoSecundario: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1EDBE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoBotaoSecundario: {
    color: "#F1EDBE",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});