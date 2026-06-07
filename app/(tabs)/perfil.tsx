import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PerfilScreen() {
  function abrirWhatsApp() {
    const telefone = "5591992257988";
    const mensagem =
      "Olá! Vim pelo aplicativo BARBER HUB e gostaria de mais informações.";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Ionicons name="person-circle-outline" size={70} color="#F1EDBE" />
      </View>

      <Text style={styles.titulo}>Perfil</Text>

      <Text style={styles.nome}>De La Castro Barbearia</Text>

      <Text style={styles.texto}>
        Gerencie informações da barbearia, consulte a agenda administrativa e
        acesse os canais de contato.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/sobre")}
        activeOpacity={0.8}
      >
        <Ionicons name="business-outline" size={22} color="#000000" />
        <Text style={styles.textoBotao}>Sobre a barbearia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => router.push("/admin")}
        activeOpacity={0.8}
      >
        <Ionicons name="calendar-outline" size={22} color="#F1EDBE" />
        <Text style={styles.textoBotaoSecundario}>Agenda da barbearia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoWhatsApp}
        onPress={abrirWhatsApp}
        activeOpacity={0.8}
      >
        <Ionicons name="logo-whatsapp" size={22} color="#FFFFFF" />
        <Text style={styles.textoBotaoWhatsApp}>Falar no WhatsApp</Text>
      </TouchableOpacity>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo}>BARBER HUB</Text>
        <Text style={styles.cardTexto}>
          Aplicativo acadêmico desenvolvido em React Native com Expo e banco de
          dados online Supabase.
        </Text>
      </View>
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

  logoArea: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  titulo: {
    color: "#F1EDBE",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
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
    marginBottom: 26,
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
    marginBottom: 12,
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

  botaoWhatsApp: {
    backgroundColor: "#25D366",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoBotaoWhatsApp: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  cardInfo: {
    backgroundColor: "#151515",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  cardTitulo: {
    color: "#F1EDBE",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 8,
  },

  cardTexto: {
    color: "#CCCCCC",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
});