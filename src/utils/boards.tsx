import { board } from "@/models/board.type"
import { loadBoards, saveBoard } from "./storage"
import { deleteListByBoardId } from "./lists"
import { createActivity } from "./activity"

export function createBoard(title: string, workspaceId: number) {
    const boards = loadBoards()
    const id = boards.length ? boards[boards.length - 1].id + 1 : 1
    const newBoard = {
        id,
        workspaceId,
        title,
        createdAt: new Date(),
    }

    const updateBoards = [...boards, newBoard]
    saveBoard(updateBoards)
    createActivity(workspaceId, "Create", "board", title)
}

export function editBoard(id: number, title: string, workspaceId: number) {
    const boards = loadBoards()

    const editBoard = {
        id,
        workspaceId,
        title,
    }

    const updateBoards = boards.map((board: board) => {
        if (board.id === id) {
            return editBoard
        } else return board
    })

    saveBoard(updateBoards)
    createActivity(workspaceId, "Edit", "board", title)
}

export function deleteBoard(id: number) {
    const boards = loadBoards()
    const board = boards.find((board: board) => board.id === id)
    createActivity(board.workspaceId, "Delete", "board", board.title)
    const updateBoards = boards.filter((board: board) => board.id !== id)
    deleteListByBoardId(id)
    saveBoard(updateBoards)
}

export function deleteBoardByWorkspaceId(workspaceId: number) {
    const boards = loadBoards()
    const filterBoards = boards.filter((board: board) => board.workspaceId === workspaceId)
    filterBoards.map((board: board) => deleteListByBoardId(board.id))
    const updateBoards = boards.filter((board: board) => board.workspaceId !== workspaceId)
    saveBoard(updateBoards)
}
