import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image
          source={require("../../assets/images/logo-barber.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Agende seu horário</Text>

        <Text style={styles.subtitulo}>
          Escolha o serviço, selecione a data e confirme seu atendimento.
        </Text>
      </View>

      <View style={styles.cardAgendamento}>
        <TouchableOpacity
          style={styles.linha}
          onPress={() => router.push("/sobre")}
          activeOpacity={0.8}
        >
          <View style={styles.iconeBox}>
            <Ionicons name="business-outline" size={24} color="#F1EDBE" />
          </View>

          <View style={styles.textoLinha}>
            <Text style={styles.linhaTitulo}>Unidade</Text>
            <Text style={styles.linhaDescricao}>De La Castro Barbearia</Text>
          </View>

          <Ionicons name="chevron-forward" size={26} color="#F1EDBE" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linha}
          onPress={() => router.push("/servicos")}
          activeOpacity={0.8}
        >
          <View style={styles.iconeBox}>
            <Ionicons name="cut-outline" size={24} color="#F1EDBE" />
          </View>

          <View style={styles.textoLinha}>
            <Text style={styles.linhaTitulo}>Serviços</Text>
            <Text style={styles.linhaDescricao}>
              Corte, barba, combos e estética
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={26} color="#F1EDBE" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linha}
          onPress={() => router.push("/agendar")}
          activeOpacity={0.8}
        >
          <View style={styles.iconeBox}>
            <Ionicons name="calendar-outline" size={24} color="#F1EDBE" />
          </View>

          <View style={styles.textoLinha}>
            <Text style={styles.linhaTitulo}>Data e horário</Text>
            <Text style={styles.linhaDescricao}>
              Selecione o melhor horário
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={26} color="#F1EDBE" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoPrincipal}
        onPress={() => router.push("/servicos")}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoPrincipal}>Começar agendamento</Text>
      </TouchableOpacity>

      <View style={styles.areaAtalhos}>
        <TouchableOpacity
          style={styles.atalho}
          onPress={() => router.push("/meus-agendamentos")}
          activeOpacity={0.8}
        >
          <View style={styles.atalhoIconeBox}>
            <Ionicons name="clipboard-outline" size={36} color="#F1EDBE" />
          </View>

          <Text style={styles.atalhoTexto}>Meus{"\n"}agendamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.atalho}
          onPress={() => router.push("/contato")}
          activeOpacity={0.8}
        >
          <View style={styles.atalhoIconeBox}>
            <Ionicons name="logo-whatsapp" size={38} color="#25D366" />
          </View>

          <Text style={styles.atalhoTexto}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoApp}>
        <Text style={styles.infoTexto}>BARBER HUB</Text>
        <Text style={styles.versao}>versão 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    padding: 20,
    paddingBottom: 110,
  },

  hero: {
    alignItems: "center",
    paddingTop: 30,
    marginBottom: 28,
  },

  logo: {
    width: 170,
    height: 170,
    marginBottom: 10,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitulo: {
    color: "#DADADA",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 12,
  },

  cardAgendamento: {
    gap: 14,
    marginBottom: 20,
  },

  linha: {
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    padding: 16,
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  iconeBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  textoLinha: {
    flex: 1,
  },

  linhaTitulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  linhaDescricao: {
    color: "#BEBEBE",
    fontSize: 14,
  },

  botaoPrincipal: {
    backgroundColor: "#F1EDBE",
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 18,
  },

  textoBotaoPrincipal: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "700",
  },

  areaAtalhos: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 26,
  },

  atalho: {
    flex: 1,
    backgroundColor: "#151515",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2D2D2D",
    minHeight: 150,
  },

  atalhoIconeBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  atalhoTexto: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 24,
  },

  infoApp: {
    alignItems: "center",
    marginTop: 10,
  },

  infoTexto: {
    color: "#F1EDBE",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  versao: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 6,
  },
});