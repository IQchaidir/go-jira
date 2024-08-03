import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { editList } from "@/utils/lists"
import { EditIcon } from "lucide-react"
import { useState } from "react"

export function EditlistDialog({
    onEdit,
    currentTitle,
    id,
    boardId,
}: {
    onEdit: () => void
    currentTitle: string
    id: number
    boardId: number
}) {
    const [title, setTitle] = useState<string>(currentTitle)
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        if (title === "") {
            return alert("title cannot be empty")
        }
        editList(id, title, boardId)
        onEdit()
        setTitle(title)
        setOpen(false)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <EditIcon className="cursor-pointer w-5 h-5" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit List</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="List title...."
                        className="w-full border border-black rounded-md p-1 "
                    />
                </div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Edit!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
