import { activity } from "@/types/activity.type"
import { board } from "@/types/board.type"
import { card } from "@/types/card.type"
import { list } from "@/types/list.type"
import { workspace } from "@/types/workspace.type"

export const defaultWorkspaces = [
    {
        id: 1,
        title: "Lorem Inc.",
        createdAt: new Date(),
    },
]

export const defaultBoards = [
    {
        id: 1,
        workspaceId: 1,
        title: "Task App",
        createdAt: new Date(),
    },
    {
        id: 2,
        workspaceId: 1,
        title: "Web App",
        createdAt: new Date(),
    },
]

export const defaultLists = [
    {
        id: 1,
        boardId: 1,
        title: "To Do",
        createdAt: new Date(),
    },
    {
        id: 2,
        boardId: 1,
        title: "Done",
        createdAt: new Date(),
    },
]

export const defaultCards = [
    {
        id: 1,
        listId: 1,
        title: "homepage",
        createdAt: new Date(),
    },
    {
        id: 2,
        listId: 1,
        title: "interactive",
        createdAt: new Date(),
    },
]

export const defaultActivities = [
    {
        id: 1,
        workspaceId: 1,
        title: `Created board "Task App" `,
        createdAt: new Date(),
    },
    {
        id: 2,
        workspaceId: 1,
        title: `Created board "Board App" `,
        createdAt: new Date(),
    },
    {
        id: 3,
        workspaceId: 1,
        title: `Created list "To Do" `,
        createdAt: new Date(),
    },
    {
        id: 4,
        workspaceId: 1,
        title: `Created list "Done" `,
        createdAt: new Date(),
    },
    {
        id: 5,
        workspaceId: 1,
        title: `Created card "homepage" `,
        createdAt: new Date(),
    },
    {
        id: 6,
        workspaceId: 1,
        title: `Created card "interactive" `,
        createdAt: new Date(),
    },
]

export function saveWorkspace(workspaces: workspace[]) {
    localStorage.setItem("workspaces", JSON.stringify(workspaces))
}

export function loadWorkspaces() {
    const workspaces = localStorage.getItem("workspaces")

    if (!workspaces) {
        saveWorkspace(defaultWorkspaces)
        return defaultWorkspaces
    }

    try {
        return JSON.parse(workspaces)
    } catch (error) {
        console.error("Failed to load workspaces", error)
        return defaultWorkspaces
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
        saveCard(defaultCards)
        return defaultCards
    }

    try {
        return JSON.parse(cards)
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
        saveBoard(defaultBoards)
        return defaultBoards
    }

    try {
        return JSON.parse(boards)
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
        saveLists(defaultLists)
        return defaultLists
    }

    try {
        return JSON.parse(lists)
    } catch (error) {
        console.error("failed to load lists", error)
    }
}

export function loadListById(id: number) {
    const lists = loadLists()
    const list = lists.find((list: list) => {
        return list.id === id
    })

    return list
}

export function saveActivity(activity: activity[]) {
    localStorage.setItem("activities", JSON.stringify(activity))
}
export function loadActivities() {
    const activity = localStorage.getItem("activities")

    if (!activity) {
        saveActivity(defaultActivities)
        return defaultActivities
    }

    try {
        return JSON.parse(activity)
    } catch (error) {
        console.error("failed to load activity", error)
    }
}
