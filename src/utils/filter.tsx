import { board } from "@/types/board.type"
import { loadBoards, loadCards, loadLists } from "./storage"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"

export function filterBoardByWokrspace(workspaceId: number) {
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
