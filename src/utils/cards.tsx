import { card } from "@/types/card.type"
import { loadCards, saveCard } from "./storage"

export function createCard(title: string, listId: number) {
    const cards = loadCards()
    const id = cards.length ? cards[cards.length - 1].id + 1 : 1
    const newcard = {
        id,
        listId,
        title,
    }

    const updatecards = [...cards, newcard]
    saveCard(updatecards)
}

export function editCard(id: number, title: string, listId: number) {
    const cards = loadCards()

    const editcard = {
        id,
        listId,
        title,
    }

    const updatecards = cards.map((card: card) => {
        if (card.id === id) {
            return editcard
        } else return card
    })

    saveCard(updatecards)
}

export function deleteCard(id: number) {
    const cards = loadCards()
    const updatecards = cards.filter((card: card) => card.id !== id)
    saveCard(updatecards)
}

export function deleteCardByListId(ListId: number) {
    const cards = loadCards()
    const updatecards = cards.filter((card: card) => card.listId !== ListId)
    saveCard(updatecards)
}
