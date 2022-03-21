import { useState, useEffect } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';

import Card from "./components/Card"
import { getAllCards } from "./querys/get";

export default function Dashboard() {
  const [cards, setCards] = useState([])
  const [state, setState] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("blur", () => setState(!state))
    navigation.addListener("focus", () => setState(!state))

    getAllCards().then(rowCards => {
      if (rowCards !== null)
        setCards(rowCards)
    })

  }, [state])


  return (
    <>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardSpace}>
          {
            cards && cards.map(note => (<Card key={note.title} title={note.title} content={note.content} setState={setState}/>))
          }
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.createCardContainer}
        onPress={() => navigation.navigate("ViewCard", {
          orgTitle: ""
        })}
      >
        <Text style={styles.createCardText}>+</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#1a1c1b",
  },
  cardSpace: {
    alignItems: "center",    
    padding: 8,
    marginTop: 16,
    width: "100%",
  },
  createCardContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 60,
    backgroundColor: "#ba7900",
    alignItems: "center",
    justifyContent: "center"
  },
  createCardText: {
    color: "#FAFAFA",
    fontSize: 24,
    fontWeight: "bold"
  }
})