import { board } from "@/types/board.type"
import { loadBoards, saveBoard } from "./storage"
import { deleteList, deleteListByBoardId } from "./lists"

export function createBoard(title: string, workspaceId: number) {
    const boards = loadBoards()
    const id = boards.length ? boards[boards.length - 1].id + 1 : 1
    const newBoard = {
        id,
        workspaceId,
        title,
    }

    const updateBoards = [...boards, newBoard]
    saveBoard(updateBoards)
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
}

export function deleteBoard(id: number) {
    const boards = loadBoards()
    const updateBoards = boards.filter((board: board) => board.id !== id)
    deleteListByBoardId(id)
    saveBoard(updateBoards)
}

export function deleteBoardByWorkspaceId(workspaceId: number) {
    const boards = loadBoards()
    boards.map((board: board) => deleteListByBoardId(board.id))
    const updateBoards = boards.filter((board: board) => board.workspaceId !== workspaceId)
    saveBoard(updateBoards)
}
