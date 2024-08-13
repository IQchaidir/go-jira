import { board } from "@/models/board.type"
import { loadActivities, loadBoards, loadCards, loadLists } from "./storage"
import { card } from "@/models/card.type"
import { list } from "@/models/list.type"
import { activity } from "@/models/activity.type"

export function filterBoardByWorkspace(workspaceId: number) {
    const boards = loadBoards()
    const filterBoard = boards.filter((board: board) => {
        return board.workspaceId === workspaceId
    })

    return filterBoard
}

export function filterlistByBoard(boardId: number) {
    const lists = loadLists()
    const filterLists = lists.filter((list: list) => {
        return list.boardId === boardId
    })

    return filterLists
}

export function filterCardByList(listId: number) {
    const cards = loadCards()
    const filterCard = cards.filter((card: card) => {
        return card.listId === listId
    })

    return filterCard
}

export function filterActivityByWorkspace(workspaceId: number) {
    const activities = loadActivities()
    const filterActivity = activities.filter((activity: activity) => {
        return activity.workspaceId === workspaceId
    })
    return filterActivity
}

export const getCardsByListId = (listId: number, cards: card[]) => {
    return cards.filter((card) => card.listId === listId)
}
