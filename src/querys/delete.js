import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCards } from './get';

const keyCard = "@card"

export async function deleteCard(title) {
  let cards = await getAllCards()

  cards = cards.filter(card => card.title != title)

  // Salvando a nota
  const jsonContent = JSON.stringify(cards)
  await AsyncStorage.setItem(keyCard, jsonContent)
}