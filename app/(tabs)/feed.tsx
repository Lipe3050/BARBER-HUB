import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const estilos = [
  {
    id: 1,
    titulo: "Corte de cabelo",
    categoria: "Clássico",
    descricao: "Corte masculino com acabamento profissional para o dia a dia.",
    icone: "cut-outline",
    servico: "Corte de cabelo",
  },
  {
    id: 2,
    titulo: "Barba",
    categoria: "Acabamento",
    descricao: "Modelagem e alinhamento para deixar a barba mais elegante.",
    icone: "man-outline",
    servico: "Barba",
  },
  {
    id: 3,
    titulo: "Combo Corte + Barba",
    categoria: "Mais pedido",
    descricao: "Pacote completo para renovar o visual em um único atendimento.",
    icone: "sparkles-outline",
    servico: "COMBO (Corte + Barba)",
  },
  {
    id: 4,
    titulo: "Platinado",
    categoria: "Estilo",
    descricao: "Visual moderno, marcante e ideal para quem quer se destacar.",
    icone: "flash-outline",
    servico: "Platinado",
  },
  {
    id: 5,
    titulo: "Luzes",
    categoria: "Transformação",
    descricao: "Técnica para iluminar o cabelo e valorizar o corte.",
    icone: "sunny-outline",
    servico: "Luzes",
  },
  {
    id: 6,
    titulo: "Sobrancelha",
    categoria: "Detalhe",
    descricao: "Alinhamento e limpeza para complementar o visual.",
    icone: "eye-outline",
    servico: "Sobrancelha",
  },
];

export default function FeedScreen() {
  function agendarEstilo(servico: string) {
    router.push({
      pathname: "/agendar",
      params: { servico },
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Feed</Text>

        <Text style={styles.subtitulo}>
          Inspirações, estilos e serviços para escolher seu próximo visual.
        </Text>
      </View>

      <View style={styles.cardDestaque}>
        <View style={styles.destaqueIcone}>
          <Ionicons name="sparkles-outline" size={34} color="#000000" />
        </View>

        <View style={styles.destaqueTextoArea}>
          <Text style={styles.destaqueMini}>DE LA CASTRO BARBEARIA</Text>

          <Text style={styles.destaqueTitulo}>Estilo começa no detalhe</Text>

          <Text style={styles.destaqueTexto}>
            Escolha um serviço, agende seu horário e receba um atendimento mais
            organizado e prático.
          </Text>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>Estilos em destaque</Text>

      {estilos.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardTopo}>
            <View style={styles.cardIcone}>
              <Ionicons name={item.icone as any} size={30} color="#F1EDBE" />
            </View>

            <View style={styles.cardTextoArea}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.nome}>{item.titulo}</Text>
            </View>
          </View>

          <Text style={styles.descricao}>{item.descricao}</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => agendarEstilo(item.servico)}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotao}>Agendar este estilo</Text>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.botaoGaleria}
        onPress={() => router.push("/galeria")}
        activeOpacity={0.8}
      >
        <Ionicons name="images-outline" size={22} color="#F1EDBE" />
        <Text style={styles.textoBotaoGaleria}>Abrir galeria completa</Text>
      </TouchableOpacity>
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

  header: {
    marginTop: 28,
    marginBottom: 22,
  },

  titulo: {
    color: "#F1EDBE",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitulo: {
    color: "#DADADA",
    fontSize: 16,
    lineHeight: 23,
  },

  cardDestaque: {
    backgroundColor: "#F1EDBE",
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
    flexDirection: "row",
    alignItems: "center",
  },

  destaqueIcone: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  destaqueTextoArea: {
    flex: 1,
  },

  destaqueMini: {
    color: "#000000",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 5,
  },

  destaqueTitulo: {
    color: "#000000",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 6,
  },

  destaqueTexto: {
    color: "#1A1A1A",
    fontSize: 14,
    lineHeight: 20,
  },

  secaoTitulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#151515",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  cardTopo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  cardIcone: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  cardTextoArea: {
    flex: 1,
  },

  categoria: {
    color: "#F1EDBE",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },

  descricao: {
    color: "#CFCFCF",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },

  botao: {
    backgroundColor: "#F1EDBE",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  textoBotao: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },

  botaoGaleria: {
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1EDBE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
  },

  textoBotaoGaleria: {
    color: "#F1EDBE",
    fontSize: 16,
    fontWeight: "bold",
  },
});