import { activity } from "@/types/activity.type"
import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
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

export const defaultLists = [
    {
        id: 1,
        boardId: 1,
        title: "To Do",
    },
    {
        id: 2,
        boardId: 1,
        title: "Done",
    },
]

export const defaultCards = [
    {
        id: 1,
        listId: 1,
        title: "homepage",
    },
    {
        id: 2,
        listId: 1,
        title: "interactive",
    },
]

export const defaultActivities = [
    {
        id: 1,
        workspaceId: 1,
        title: `Created board "Task App" `,
    },
    {
        id: 2,
        workspaceId: 1,
        title: `Created board "Board App" `,
    },
    {
        id: 3,
        workspaceId: 1,
        title: `Created list "To Do" `,
    },
    {
        id: 4,
        workspaceId: 1,
        title: `Created list "Done" `,
    },
    {
        id: 5,
        workspaceId: 1,
        title: `Created card "homepage" `,
    },
    {
        id: 6,
        workspaceId: 1,
        title: `Created card "interactive" `,
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

export function saveLists(lists: list[]) {
    localStorage.setItem("lists", JSON.stringify(lists))
}
export function loadLists() {
    const lists = localStorage.getItem("lists")

    if (!lists) {
        saveLists([])
    }

    try {
        return JSON.parse(lists || "[]")
    } catch (error) {
        console.error("failed to load lists", error)
    }
}

export function saveActivity(activity: activity[]) {
    localStorage.setItem("activities", JSON.stringify(activity))
}
export function loadActivities() {
    const activity = localStorage.getItem("activities")

    if (!activity) {
        saveActivity([])
    }

    try {
        return JSON.parse(activity || "[]")
    } catch (error) {
        console.error("failed to load activity", error)
    }
}
