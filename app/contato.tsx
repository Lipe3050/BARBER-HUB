import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ContatoScreen() {
  function abrirWhatsApp() {
    const telefone = "5591993914131";

    const mensagem =
      "Olá! Vim pelo aplicativo BARBER HUB e gostaria de agendar um horário.";

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
      mensagem
    )}`;

    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contato</Text>

      <Text style={styles.subtitulo}>
        Fale com a barbearia pelo WhatsApp para tirar dúvidas ou confirmar seu
        horário.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={abrirWhatsApp}>
        <Text style={styles.textoBotao}>Abrir WhatsApp</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Atendimento rápido, prático e direto com a barbearia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  titulo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 23,
  },

  botao: {
    backgroundColor: "#25D366",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
  },

  textoBotao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    color: "#AAAAAA",
    textAlign: "center",
    fontSize: 14,
  },
});