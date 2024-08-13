import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { createBoard } from "@/utils/boards"
import { useState } from "react"

export function CreateBoardDialog({
    fetchBoardFromLocal,
    workspaceId,
}: {
    fetchBoardFromLocal: () => void
    workspaceId: number
}) {
    const [title, setTitle] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (title.trim() === "") {
            return toast({
                title: "Title cannot be empty!",
                variant: "destructive",
            })
        }
        createBoard(title.trim(), workspaceId)
        fetchBoardFromLocal()
        setTitle("")
        setOpen(false)
        toast({
            title: "Success create board!",
        })
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex rounded-md h-32 bg-gray-100 items-center justify-center font-semibold transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                    Create New Board
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Board</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Board title...."
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
