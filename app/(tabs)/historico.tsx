import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoricoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico</Text>

      <Text style={styles.texto}>
        Acompanhe seus horários marcados no BARBER HUB.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/meus-agendamentos")}
      >
        <Text style={styles.textoBotao}>Ver meus agendamentos</Text>
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
    marginBottom: 24,
  },

  botao: {
    backgroundColor: "#F1EDBE",
    padding: 16,
    borderRadius: 14,
  },

  textoBotao: {
    color: "#000000",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});