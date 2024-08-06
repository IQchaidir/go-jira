import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteWorkspace } from "@/utils/workspace"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "./ui/use-toast"

export function DeleteWorkspaceDialog({ onDelete, id }: { onDelete: () => void; id: number }) {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleSubmit() {
        deleteWorkspace(id)
        onDelete()
        setOpen(false)
        navigate("/")
        toast({
            title: "Success delete workspace!",
        })
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex gap-1 items-center cursor-pointer ml-4 mt-3 text-red-500">
                    <div className="p-1 rounded-md ">
                        <TrashIcon className="w-5 h-5" />
                    </div>
                    <span className="text-base">Delete</span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure delete this workspace?</DialogTitle>
                </DialogHeader>
                <div></div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Delete!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
