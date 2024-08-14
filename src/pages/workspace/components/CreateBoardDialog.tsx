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
import { FormValues, schema } from "@/lib/validation"
import { createBoard } from "@/utils/boards"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export function CreateBoardDialog({
    fetchBoardFromLocal,
    workspaceId,
}: {
    fetchBoardFromLocal: () => void
    workspaceId: number
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })
    const [open, setOpen] = useState<boolean>(false)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        createBoard(data.title.trim(), workspaceId)
        fetchBoardFromLocal()
        setOpen(false)
        toast({
            title: "Success create board!",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <div className="flex rounded-md h-32 bg-gray-100 items-center justify-center font-semibold transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                    Create New Board
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Board</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Board title...."
                        className="w-full border border-black rounded-md p-1 "
                        {...register("title")}
                    />
                    <div className="h-6">
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant={"destructive"} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Create!</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
