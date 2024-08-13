import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createWorkspace } from "@/utils/workspace"
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "./ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
    title: z.string().min(1, "Title is required"),
})

type FormValues = z.infer<typeof schema>

export function CreateWorkspaceDialog({ fetchWorkspaceFromLocal }: { fetchWorkspaceFromLocal: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })
    const [open, setOpen] = React.useState<boolean>(false)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const newWorkspace = createWorkspace(data.title.trim())
        fetchWorkspaceFromLocal()
        setOpen(false)
        toast({
            title: "Success create workspace!",
        })
        navigate(`/workspace/${newWorkspace.id}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Plus className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Workspace title...."
                        className="w-full border border-black rounded-md p-1"
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
