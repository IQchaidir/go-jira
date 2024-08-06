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
import { deleteBoard } from "@/utils/boards"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DeleteBoardDialog({ id, workspaceId }: { id: number; workspaceId: number }) {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleSubmit() {
        deleteBoard(id)
        setOpen(false)
        navigate(`/workspace/${workspaceId}`)
        toast({
            title: "Success delete board!",
        })
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <TrashIcon className="text-red-500 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure delete this board?</DialogTitle>
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
