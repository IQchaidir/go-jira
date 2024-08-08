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
import { useState } from "react"

export function CreateListDialog({ onCreate, boardId }: { onCreate: () => void; boardId: number }) {
    const [title, setTitle] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        if (title.trim() === "") {
            return toast({
                title: "title cannot be empty!",
                variant: "destructive",
            })
        }
        createList(title, boardId)
        onCreate()
        setTitle("")
        setOpen(false)
        toast({
            title: "Success create list!",
        })
    }

    function handleClose() {
        setOpen(false)
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
                        Create!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
