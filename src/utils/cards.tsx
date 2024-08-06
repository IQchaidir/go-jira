import { card } from "@/types/card.type"
import { loadBoardById, loadCards, loadListById, saveCard } from "./storage"
import { createActivity } from "./activity"

export function createCard(title: string, listId: number) {
    const cards = loadCards()
    const list = loadListById(listId)
    const board = loadBoardById(list.boardId)
    const id = cards.length ? cards[cards.length - 1].id + 1 : 1
    const newcard = {
        id,
        listId,
        title,
        createdAt: new Date(),
    }

    const updatecards = [...cards, newcard]
    saveCard(updatecards)
    createActivity(board.workspaceId, "Create", "card", title)
}

export function editCard(id: number, title: string, listId: number) {
    const cards = loadCards()
    const list = loadListById(listId)
    const board = loadBoardById(list.boardId)

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
    createActivity(board.workspaceId, "Edit", "card", title)
}

export function deleteCard(id: number) {
    const cards = loadCards()
    const card = cards.find((card: card) => card.id === id)
    const list = loadListById(card.listId)
    const board = loadBoardById(list.boardId)
    createActivity(board.workspaceId, "Delete", "card", card.title)
    const updatecards = cards.filter((card: card) => card.id !== id)
    saveCard(updatecards)
}

export function deleteCardByListId(ListId: number) {
    const cards = loadCards()
    const updatecards = cards.filter((card: card) => card.listId !== ListId)
    saveCard(updatecards)
}
