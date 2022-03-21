import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"

import { deleteCard } from "../querys/delete"

export default function Card({ title, content, setState }) {
  const navigation = useNavigation()

  function handleDelete() {
    Alert.alert(
      "Você tem certeza que quer excluir?",
      "A operação será permanente",
      [
        {
          text: "Sim",
          onPress: () => {
            deleteCard(title)
            setState(v => !v)
          }
        },
        {
          text: "Não",
          onPress: () => {}
        }
      ]
    )
  }

  function handleNotePage() {
    navigation.navigate("ViewCard", {
      orgTitle: title
    })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleNotePage}>
      <View style={styles.headerCard}>
        <Text style={styles.titleCard}>
          {title}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" color="#767b82" size={24}/>
        </TouchableOpacity>
      </View>

      <View style={styles.contentCard}>
        <Text 
          style={styles.textContentCard}
          numberOfLines={5}
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    opacity: 0.9,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FAFAFA",
    padding: 8,
    minHeight: 60,
    marginBottom: 16,
    width: "100%"
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  titleCard: {
    color: "#FAFAFA",
    fontWeight: "bold"
  },
  contentCard: {

  },
  textContentCard: {
    fontSize: 10,
    color: "#FAFAFA",
    fontWeight: "400"
  }
})