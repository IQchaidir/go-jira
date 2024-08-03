import { workspace } from "@/types/workspace.type"
import { loadWorkspaces, saveWorkspace } from "./storage"

export function createWorkspace(title: string) {
    const workspaces = loadWorkspaces()
    const id = workspaces.length ? workspaces[workspaces.length - 1].id + 1 : 1
    const newWorkspace = {
        id,
        title,
    }

    const updateWorkspaces = [...workspaces, newWorkspace]
    saveWorkspace(updateWorkspaces)
}

export function editWorkspace(id: number, title: string) {
    const workspaces = loadWorkspaces()

    const editWorkspace = {
        id,
        title,
    }

    const updateWorkspaces = workspaces.map((workspace: workspace) => {
        if (workspace.id === id) {
            return editWorkspace
        } else return workspace
    })

    saveWorkspace(updateWorkspaces)
}

export function deleteWorkspace(id: number) {
    const workspaces = loadWorkspaces()
    const updateWorkspaces = workspaces.filter((workspace: workspace) => workspace.id !== id)
    saveWorkspace(updateWorkspaces)
}
