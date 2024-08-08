import { list } from "@/types/list.type"
import { loadBoardById, loadLists, saveLists } from "./storage"
import { deleteCardByListId } from "./cards"
import { createActivity } from "./activity"

export function createList(title: string, boardId: number) {
    const lists: list[] = loadLists()
    const board = loadBoardById(boardId)
    const id =
        lists.reduce((max, obj) => {
            return obj.id > max ? obj.id : max
        }, 0) + 1
    const newlist = {
        id,
        boardId,
        title,
        createdAt: new Date(),
    }

    const updatelists = [...lists, newlist]
    saveLists(updatelists)
    createActivity(board.workspaceId, "Create", "list", title)
}

export function editList(id: number, title: string, boardId: number) {
    const lists = loadLists()
    const board = loadBoardById(boardId)

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
    createActivity(board.workspaceId, "Edit", "list", title)
}

export function deleteList(id: number) {
    const lists = loadLists()
    const list = lists.find((list: list) => list.id === id)
    const board = loadBoardById(list.boardId)
    createActivity(board.workspaceId, "delete", "list", list.title)
    deleteCardByListId(id)
    const updatelists = lists.filter((list: list) => list.id !== id)
    saveLists(updatelists)
}

export function deleteListByBoardId(boardId: number) {
    const lists = loadLists()
    const filterLists = lists.map((list: list) => list.boardId === boardId)
    filterLists.map((list: list) => deleteCardByListId(list.id))
    const updateLists = lists.filter((list: list) => list.boardId !== boardId)
    saveLists(updateLists)
}
