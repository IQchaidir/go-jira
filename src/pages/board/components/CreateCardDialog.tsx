import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createCard } from "@/utils/cards"
import { Plus } from "lucide-react"
import { useState } from "react"

export function CreateCardDialog({ onCreate, listId }: { onCreate: () => void; listId: number }) {
    const [title, setTitle] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        if (title === "") {
            return alert("title cannot be empty")
        }
        createCard(title, listId)
        onCreate()
        setTitle("")
        setOpen(false)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex gap-2 items-center text-gray-500 cursor-pointer">
                    <Plus className="w-5 h-5" />
                    Add a card
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create List</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Card title...."
                        className="w-full border border-black rounded-md p-1 "
                    />
                </div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={handleClose}>
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
