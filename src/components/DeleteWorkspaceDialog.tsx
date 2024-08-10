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

export function DeleteWorkspaceDialog({ id }: { id: number }) {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleSubmit() {
        deleteWorkspace(id)
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
                <div className="flex cursor-pointer text-red-500">
                    <TrashIcon className="w-7 h-7" />
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
