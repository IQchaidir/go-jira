import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createWorkspace } from "@/utils/workspace"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { toast } from "./ui/use-toast"
import { useNavigate } from "react-router-dom"

export function CreateWorkspaceDialog({ fetchWorkspaceFromLocal }: { fetchWorkspaceFromLocal: () => void }) {
    const [title, setTitle] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (title.trim() === "") {
            return toast({
                title: "Title cannot be empty!",
                variant: "destructive",
            })
        }
        const newWorkspace = createWorkspace(title.trim())
        fetchWorkspaceFromLocal()
        setTitle("")
        setOpen(false)
        toast({
            title: "Success create workspace!",
        })
        navigate(`/workspace/${newWorkspace.id}`)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Plus className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit} method="post">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Workspace title...."
                            className="w-full border border-black rounded-md p-1 "
                        />
                    </form>
                </div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Create!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
