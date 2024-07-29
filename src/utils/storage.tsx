import WorkSpace from "@/components/WorkSpace"
import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { workspace } from "@/types/workspace.type"

export const defaultWorkspaces = [
    {
        id: 1,
        title: "Lorem Inc.",
    },
    {
        id: 2,
        title: "Ipsum Inc.",
    },
    {
        id: 3,
        title: "Academy",
    },
]

export const defaultBoards = [
    {
        id: 1,
        workspaceId: 1,
        title: "Task App",
    },
    {
        id: 2,
        workspaceId: 1,
        title: "Web App",
    },
]

export const defaultCards = [
    {
        id: 1,
        boardId: 1,
        title: "homepage",
    },
    {
        id: 2,
        boardId: 1,
        title: "interactive",
    },
]

export function saveWorkspace(workspaces: workspace[]) {
    localStorage.setItem("workspaces", JSON.stringify(workspaces))
}

export function loadWorkspaces() {
    const workspaces = localStorage.getItem("workspaces")
    if (!workspaces) {
        saveWorkspace([])
    }
    try {
        return JSON.parse(workspaces || "[]")
    } catch (error) {
        console.error("failed load workspace", error)
    }
}

export function loadWorkspaceById(id: number) {
    const workspaces = loadWorkspaces()
    const workspace = workspaces.find((workspace: workspace) => {
        return workspace.id === id
    })

    return workspace
}

export function saveCard(cards: card[]) {
    localStorage.setItem("cards", JSON.stringify(cards))
}
export function loadCards() {
    const cards = localStorage.getItem("cards")

    if (!cards) {
        saveCard([])
    }

    try {
        return JSON.parse(cards || "[]")
    } catch (error) {
        console.error("failed load card", error)
    }
}

export function loadCardById(id: number) {
    const cards = loadCards()
    const card = cards.find((card: card) => {
        return card.id === id
    })

    return card
}

export function saveBoard(boards: board[]) {
    localStorage.setItem("boards", JSON.stringify(boards))
}
export function loadBoards() {
    const boards = localStorage.getItem("boards")

    if (!boards) {
        saveBoard([])
    }

    try {
        return JSON.parse(boards || "[]")
    } catch (error) {
        console.error("failed to load boards", error)
    }
}

export function loadBoardById(id: number) {
    const boards = loadBoards()
    const board = boards.find((board: board) => {
        return board.id === id
    })

    return board
}
