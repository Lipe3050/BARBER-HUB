import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const servicos = [
  {
    id: 1,
    nome: "Corte de cabelo",
    preco: "R$ 35.00",
    duracao: "30 min",
  },
  {
    id: 2,
    nome: "Barba",
    preco: "R$ 35.00",
    duracao: "30 min",
  },
  {
    id: 3,
    nome: "COMBO (Corte + Barba)",
    preco: "R$ 60.00",
    duracao: "60 min",
  },
  {
    id: 4,
    nome: "Hidratação",
    preco: "R$ 20.00",
    duracao: "7 min",
  },
  {
    id: 5,
    nome: "Pigmentação",
    preco: "R$ 20.00",
    duracao: "5 min",
  },
  {
    id: 6,
    nome: "Limpeza Facial (Máscara Black)",
    preco: "R$ 20.00",
    duracao: "10 min",
  },
  {
    id: 7,
    nome: "Depilação Nasal",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
  {
    id: 8,
    nome: "Depilação Orelha",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
  {
    id: 9,
    nome: "Sobrancelha",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
  {
    id: 10,
    nome: "Pintura",
    preco: "R$ 45.00",
    duracao: "10 min",
  },
  {
    id: 11,
    nome: "Desenho (Freestyle)",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
  {
    id: 12,
    nome: "Hidratação de Barba",
    preco: "R$ 20.00",
    duracao: "7 min",
  },
  {
    id: 13,
    nome: "Camuflagem",
    preco: "R$ 40.00",
    duracao: "10 min",
  },
  {
    id: 14,
    nome: "Platinado",
    preco: "R$ 150.00",
    duracao: "120 min",
  },
  {
    id: 15,
    nome: "COMBO ESSENCIAL - Corte + Dep. Nariz e Orelha + Hidratação + Sobrancelha",
    preco: "R$ 90.00",
    duracao: "60 min",
  },
  {
    id: 16,
    nome: "COMBO PREMIUM - Corte + Selagem + Dep. Nariz e Orelha + Sobrancelha",
    preco: "R$ 150.00",
    duracao: "60 min",
  },
  {
    id: 17,
    nome: "COMBO ELITE - Corte + Selagem + Dep. Nariz e Orelha + Máscara Facial + Sobrancelha",
    preco: "R$ 175.00",
    duracao: "60 min",
  },
  {
    id: 18,
    nome: "Luzes",
    preco: "R$ 100.00",
    duracao: "90 min",
  },
  {
    id: 19,
    nome: "Desondulação Capilar",
    preco: "R$ 100.00",
    duracao: "30 min",
  },
  {
    id: 20,
    nome: "Penteado (Escova)",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
  {
    id: 21,
    nome: "Acabamento (Pezinho)",
    preco: "R$ 15.00",
    duracao: "5 min",
  },
];

export default function ServicosScreen() {
  const [servicoSelecionado, setServicoSelecionado] = useState("");

  function selecionarServico() {
    if (!servicoSelecionado) {
      return;
    }

    router.push({
      pathname: "/agendar",
      params: { servico: servicoSelecionado },
    });
  }

  return (
    <View style={styles.tela}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Escolha um serviço</Text>

          <Text style={styles.subtitulo}>
            Selecione uma opção para continuar com o agendamento.
          </Text>
        </View>

        {servicos.map((servico) => {
          const selecionado = servicoSelecionado === servico.nome;

          return (
            <TouchableOpacity
              key={servico.id}
              style={[styles.card, selecionado && styles.cardSelecionado]}
              onPress={() => setServicoSelecionado(servico.nome)}
              activeOpacity={0.8}
            >
              <View style={styles.infoServico}>
                <Text style={styles.nome}>{servico.nome}</Text>

                <Text style={styles.detalhes}>
                  {servico.preco} · {servico.duracao}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  selecionado && styles.radioSelecionado,
                ]}
              >
                {selecionado && <View style={styles.radioInterno} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.rodape}>
        <TouchableOpacity
          style={[
            styles.botaoSelecionar,
            servicoSelecionado && styles.botaoSelecionarAtivo,
          ]}
          onPress={selecionarServico}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.textoBotao,
              servicoSelecionado && styles.textoBotaoAtivo,
            ]}
          >
            Selecionar serviços
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#000000",
  },

  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    color: "#AAAAAA",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginBottom: 16,
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#242424",
  },

  cardSelecionado: {
    borderColor: "#D4AF37",
    backgroundColor: "#252218",
  },

  infoServico: {
    flex: 1,
    paddingRight: 14,
  },

  nome: {
    color: "#F2F2F2",
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 10,
    lineHeight: 28,
  },

  detalhes: {
    color: "#F5F5F5",
    fontSize: 18,
    fontWeight: "500",
  },

  radio: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
  },

  radioSelecionado: {
    borderColor: "#D4AF37",
    backgroundColor: "#D4AF37",
  },

  radioInterno: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#000000",
  },

  rodape: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.95)",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 26,
    borderTopWidth: 1,
    borderTopColor: "#1F1F1F",
  },

  botaoSelecionar: {
    backgroundColor: "#8A8A8A",
    padding: 18,
    borderRadius: 10,
  },

  botaoSelecionarAtivo: {
    backgroundColor: "#D4AF37",
  },

  textoBotao: {
    color: "#333333",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
  },

  textoBotaoAtivo: {
    color: "#000000",
    fontWeight: "bold",
  },
});