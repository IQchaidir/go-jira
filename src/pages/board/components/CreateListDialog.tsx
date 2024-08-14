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
import { createList } from "@/utils/lists"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export function CreateListDialog({
    fetchDataFromLocal,
    boardId,
}: {
    fetchDataFromLocal: () => void
    boardId: number
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
        createList(data.title.trim(), boardId)
        fetchDataFromLocal()
        setOpen(false)
        toast({
            title: "Success create list!",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="List title...."
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
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                            Create!
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
