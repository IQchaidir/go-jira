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
import { deleteList } from "@/utils/lists"
import { TrashIcon } from "lucide-react"
import { useState } from "react"

export function DeleteListDialog({ id, renderPage }: { id: number; renderPage: () => void }) {
    const [open, setOpen] = useState<boolean>(false)

    function handleSubmit() {
        deleteList(id)
        renderPage()
        setOpen(false)
        toast({
            title: "Success delete list!",
        })
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <TrashIcon className="text-red-500 cursor-pointer w-5 h-5" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure delete this list?</DialogTitle>
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
