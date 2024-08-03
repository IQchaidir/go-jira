import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { editWorkspace } from "@/utils/workspace"
import { EditIcon } from "lucide-react"
import { useState } from "react"

export function EditWorkspaceDialog({
    onEdit,
    currentTitle,
    id,
}: {
    onEdit: () => void
    currentTitle: string
    id: number
}) {
    const [title, setTitle] = useState<string>(currentTitle)
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        if (title === "") {
            return alert("title cannot be empty")
        }
        editWorkspace(id, title)
        onEdit()
        setTitle("")
        setOpen(false)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex gap-1 items-center cursor-pointer ml-4 mt-3">
                    <div className="p-1 rounded-md text-gray-500">
                        <EditIcon className="w-5 h-5" />
                    </div>
                    <span className="text-base">Edit Workspace</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Workspace</DialogTitle>
                </DialogHeader>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Workspace title...."
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
