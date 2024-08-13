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
import { createList } from "@/utils/lists"
import { Plus } from "lucide-react"
import React, { useState } from "react"

export function CreateListDialog({
    fetchDataFromLocal,
    boardId,
}: {
    fetchDataFromLocal: () => void
    boardId: number
}) {
    const [title, setTitle] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (title.trim() === "") {
            return toast({
                title: "title cannot be empty!",
                variant: "destructive",
            })
        }
        createList(title.trim(), boardId)
        fetchDataFromLocal()
        setTitle("")
        setOpen(false)
        toast({
            title: "Success create list!",
        })
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex rounded-md p-2 h-10 font-semibold  items-center bg-gray-100 cursor-pointer gap-2">
                    <Plus className="w-5 h-5" />
                    <span>Add a list</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create List</DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="List title...."
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
