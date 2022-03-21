import { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

import { createCard, updateCard } from "./querys/create"
import { getCard, titleExists } from "./querys/get"

import { Feather } from "@expo/vector-icons"

export default function ViewCard({ route }) {
  const titlePattern = "Digite seu título aqui..."

  const { orgTitle } = route.params

  const [title, setTitle] = useState(titlePattern)
  const [content, setContent] = useState("")
  const [originalTitle, setOriginalTitle] = useState(orgTitle)

  const [hasTitle, setHasTitle] = useState(false)
  
  useEffect(() => {
    if (originalTitle !== "") {
      getCard(originalTitle).then(card => {
        setTitle(card.title)
        setContent(card.content)
      })
    }
  }, [originalTitle])

  useEffect(() => {
    titleExists(title).then(result => originalTitle !== title ? setHasTitle(result) : null)
  }, [title])

  function handleSave() {
    console.log(title)
    if (title !== titlePattern) {
      if (title === originalTitle) {
        updateCard(title, content).then()
      } else {
        createCard(title, content).then()
        setOriginalTitle(title)
      }
    }
  }

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TextInput 
            style={styles.titleInputHeader} 
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          {hasTitle && (<Text style={styles.alertTitle}>Esse título já existe</Text>)}

        </View>
        <View style={styles.contentContainer}>
          <TextInput 
            style={styles.contentTextInput} 
            multiline={true}
            value={content}
            onChangeText={text => setContent(text)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity 
      style={styles.createCardContainer}
      onPress={handleSave}
      >
        <Feather name="save" size={24} color="#FAFAFA"/>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1a1c1b",
  },
  headerContainer: {
    width: "100%",
    height: 84,
    alignItems: "flex-start",
    padding: 16
  },
  alertTitle: {
    fontSize: 12,
    color: "#d92121"
  },
  titleInputHeader: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FAFAFA",
  },
  contentContainer: {
    padding: 16,
    marginTop: 16,
    flex: 1
  },
  contentTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#FAFAFA",
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
})