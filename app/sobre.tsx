import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SobreScreen() {
  function abrirInstagram() {
    Linking.openURL("https://www.instagram.com/delacastrobarbearia/");
  }

  function abrirLocalizacaoBatistaCampos() {
    Linking.openURL("https://www.google.com/maps/search/?api=1&query=R.+dos+Mundurucus,+2306,+Batista+Campos,+Belém,+PA");
  }

  function abrirWhatsApp() {
    const telefone = "5591992257988";
    const mensagem = "Olá! Vim pelo aplicativo BARBER HUB e gostaria de mais informações.";
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    Linking.openURL(url);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Sobre a Barbearia</Text>

      <Text style={styles.subtitulo}>
        Conheça a De La Castro Barbearia, parceira do projeto BARBER HUB.
      </Text>

      <View style={styles.cardPrincipal}>
        <Text style={styles.nomeBarbearia}>De La Castro Barbearia</Text>
        <Text style={styles.frase}>“Homens de terno”</Text>

        <Text style={styles.texto}>
          A De La Castro Barbearia é uma barbearia voltada para cortes masculinos,
          barba e atendimento com estilo profissional. No BARBER HUB, o cliente
          pode visualizar serviços, escolher estilos e agendar seu horário com
          mais praticidade.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Unidades</Text>

        <Text style={styles.info}>📍 Unidade Una</Text>
        <Text style={styles.infoDetalhe}>Região de Una, Belém - PA</Text>

        <Text style={styles.info}>📍 Unidade Batista Campos</Text>
        <Text style={styles.infoDetalhe}>
          R. dos Mundurucus, 2306 - Batista Campos, Belém - PA
        </Text>

        <TouchableOpacity style={styles.botaoMapa} onPress={abrirLocalizacaoBatistaCampos}>
          <Text style={styles.textoBotao}>Abrir localização</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Contato</Text>

        <Text style={styles.info}>📱 (91) 99225-7988</Text>
        <Text style={styles.info}>📱 (91) 98056-9692</Text>
        <Text style={styles.info}>📸 @delacastrobarbearia</Text>

        <TouchableOpacity style={styles.botaoWhatsapp} onPress={abrirWhatsApp}>
          <Text style={styles.textoBotao}>Chamar no WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoInstagram} onPress={abrirInstagram}>
          <Text style={styles.textoBotao}>Abrir Instagram</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Sobre o Projeto</Text>

        <Text style={styles.texto}>
          O BARBER HUB foi desenvolvido como um projeto acadêmico em React Native
          com Expo, com o objetivo de facilitar o agendamento de serviços,
          reduzir conflitos de horários e modernizar a experiência de atendimento
          em barbearias.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
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
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 24,
  },

  cardPrincipal: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#3A3320",
  },

  nomeBarbearia: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  frase: {
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#171717",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  cardTitulo: {
    color: "#D4AF37",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },

  texto: {
    color: "#CCCCCC",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  info: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  infoDetalhe: {
    color: "#CCCCCC",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },

  botaoWhatsapp: {
    backgroundColor: "#25D366",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  botaoInstagram: {
    backgroundColor: "#C13584",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  botaoMapa: {
    backgroundColor: "#D4AF37",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },

  textoBotao: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});