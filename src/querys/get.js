import AsyncStorage from '@react-native-async-storage/async-storage';

const keyCard = "@card"

export async function getAllCards() {
  const jsonContent = await AsyncStorage.getItem(keyCard)
  return jsonContent !== null ? JSON.parse(jsonContent) : null
}

export async function getCard(title) {
  const cards = await getAllCards()

  return cards.filter(card => card.title === title)[0]
}

export async function titleExists(title) {
  const cards = await getAllCards()

  if (cards === null)
    return false

  const filteredCards = cards.filter(card => card.title == title)

  return filteredCards.length > 0 ? true : false
}