import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>

      <Text style={styles.nome}>De La Castro Barbearia</Text>

      <Text style={styles.texto}>
        Acesse informações da barbearia, contato, localização e detalhes do
        projeto BARBER HUB.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/sobre")}
      >
        <Text style={styles.textoBotao}>Sobre a barbearia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => router.push("/admin")}
      >
        <Text style={styles.textoBotaoSecundario}>Agenda da barbearia</Text>
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

  nome: {
    color: "#FFFFFF",
    fontSize: 22,
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
    marginBottom: 12,
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
  },

  textoBotaoSecundario: {
    color: "#F1EDBE",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});