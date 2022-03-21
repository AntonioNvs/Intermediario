import { Alert } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCards, titleExists } from './get';
import { deleteCard } from './delete';

const keyCard = "@card"

export async function createCard(title, content) {
  // Salvando a lista de títulos
  let cards = await getAllCards()

  if (await titleExists(title)) {
    Alert.alert(
      "Como foi avisado, já existia o título dado a essa nota",
      "Sua nota vai não será salva."
    )
  } else {
    if (cards === null) {
      cards = []
    }
  
    cards.push({ title, content })
  
    // Salvando a nota
    const jsonContent = JSON.stringify(cards)
    await AsyncStorage.setItem(keyCard, jsonContent)
  }
}

export async function updateCard(title, content) {
  await deleteCard(title)
  await createCard(title, content)
}
