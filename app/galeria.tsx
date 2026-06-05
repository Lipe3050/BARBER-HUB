import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const cortes = [
  {
    id: 1,
    nome: "Corte de cabelo",
    categoria: "Cabelo",
    descricao: "Corte masculino tradicional com acabamento profissional.",
    icone: "✂️",
  },
  {
    id: 2,
    nome: "Barba",
    categoria: "Barba",
    descricao: "Modelagem e alinhamento da barba com acabamento detalhado.",
    icone: "🧔",
  },
  {
    id: 3,
    nome: "COMBO (Corte + Barba)",
    categoria: "Combo",
    descricao: "Corte de cabelo e barba em um atendimento completo.",
    icone: "💈",
  },
  {
    id: 4,
    nome: "Platinado",
    categoria: "Estilo",
    descricao: "Transformação capilar com visual moderno e marcante.",
    icone: "⭐",
  },
  {
    id: 5,
    nome: "Luzes",
    categoria: "Estilo",
    descricao: "Técnica para iluminar o cabelo e destacar o visual.",
    icone: "✨",
  },
  {
    id: 6,
    nome: "Sobrancelha",
    categoria: "Acabamento",
    descricao: "Alinhamento e limpeza para valorizar o rosto.",
    icone: "👌",
  },
];

export default function GaleriaScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Galeria de Estilos</Text>

      <Text style={styles.subtitulo}>
        Inspire-se nos serviços da barbearia e escolha seu próximo visual.
      </Text>

      {cortes.map((corte) => (
        <View key={corte.id} style={styles.card}>
          <View style={styles.areaImagem}>
            <Text style={styles.icone}>{corte.icone}</Text>
          </View>

          <View style={styles.etiqueta}>
            <Text style={styles.textoEtiqueta}>{corte.categoria}</Text>
          </View>

          <View style={styles.areaTexto}>
            <Text style={styles.nome}>{corte.nome}</Text>

            <Text style={styles.descricao}>{corte.descricao}</Text>

            <Link
              href={{
                pathname: "/agendar",
                params: { servico: corte.nome },
              }}
              style={styles.botao}
            >
              Agendar este estilo
            </Link>
          </View>
        </View>
      ))}
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
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 23,
  },

  card: {
    backgroundColor: "#171717",
    borderRadius: 20,
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#3A3320",
    position: "relative",
  },

  areaImagem: {
    height: 190,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "center",
  },

  icone: {
    fontSize: 70,
  },

  etiqueta: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  textoEtiqueta: {
    color: "#0B0B0B",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  areaTexto: {
    padding: 18,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  descricao: {
    color: "#CCCCCC",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },

  botao: {
    backgroundColor: "#D4AF37",
    color: "#0B0B0B",
    textAlign: "center",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
});