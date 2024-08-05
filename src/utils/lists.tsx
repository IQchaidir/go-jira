import { list } from "@/types/list.type"
import { loadLists, saveLists } from "./storage"
import { deleteCardByListId } from "./cards"

export function createList(title: string, boardId: number) {
    const lists = loadLists()
    const id = lists.length ? lists[lists.length - 1].id + 1 : 1
    const newlist = {
        id,
        boardId,
        title,
    }

    const updatelists = [...lists, newlist]
    saveLists(updatelists)
}

export function editList(id: number, title: string, boardId: number) {
    const lists = loadLists()

    const editlist = {
        id,
        boardId,
        title,
    }

    const updatelists = lists.map((list: list) => {
        if (list.id === id) {
            return editlist
        } else return list
    })

    saveLists(updatelists)
}

export function deleteList(id: number) {
    const lists = loadLists()
    deleteCardByListId(id)
    const updatelists = lists.filter((list: list) => list.id !== id)
    saveLists(updatelists)
}

export function deleteListByBoardId(boardId: number) {
    const lists = loadLists()
    lists.map((list: list) => deleteCardByListId(list.id))
    const updateLists = lists.filter((list: list) => list.boardId !== boardId)
    saveLists(updateLists)
}
