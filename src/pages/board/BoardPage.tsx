import { Building } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { board } from "@/types/board.type"
import { loadBoardById, loadCards, loadWorkspaceById, saveLists } from "@/utils/storage"
import { filterlistByBoard, getCardsByListId } from "@/utils/filter"
import { workspace } from "@/types/workspace.type"
import { list } from "@/types/list.type"
import List from "./components/List"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import { card } from "@/types/card.type"
import { EditBoardDialog } from "./components/EditBoardDialog"
import { DeleteBoardDialog } from "./components/DeleteBoardDialog"
import { CreateListDialog } from "./components/CreateListDialog"

const BoardPage = () => {
    const { boardId } = useParams()
    const [workspace, setWorkspace] = useState<workspace>()
    const [board, setBoard] = useState<board>()
    const [lists, setLists] = useState<list[]>([])
    const [cards, setCards] = useState<card[]>([])
    const [activeList, setActiveList] = useState<list | null>(null)

    function renderPage() {
        if (board) setBoard(loadBoardById(board.id))
        if (lists && board) setLists(filterlistByBoard(board.id))
        if (cards) setCards(loadCards)
    }

    function handleDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "list") {
            setActiveList(event.active.data.current.list)
        }
        return
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) {
            return
        }
        const activeId = active.id
        const overId = over.id

        setLists((lists) => {
            const activeListIndex = lists.findIndex((list) => list.id === activeId)
            const overListIndex = lists.findIndex((list) => list.id === overId)
            const newList = arrayMove(lists, activeListIndex, overListIndex)
            saveLists(newList)
            return newList
        })
    }

    useEffect(() => {
        if (boardId) {
            const currentBoard = loadBoardById(Number(boardId))
            setBoard(currentBoard)

            const currentWorkspace = loadWorkspaceById(Number(currentBoard.workspaceId))
            setWorkspace(currentWorkspace)
            setLists(filterlistByBoard(Number(boardId)))
            setCards(loadCards())
        }
    }, [boardId])

    return (
        <section className="flex flex-col mt-10 px-7 w-full">
            <div className="flex items-center text-2xl font-semibold justify-between ">
                <div className="flex gap-2">
                    <div className="p-1 bg-purple-500 rounded-md text-white">
                        <Building className="w-8 h-8" />
                    </div>
                    <span>{workspace?.title}</span> - <span>{board?.title}</span>
                </div>

                {board && workspace && (
                    <div className="flex gap-5">
                        <EditBoardDialog
                            currentTitle={board.title}
                            id={board.id}
                            onEdit={renderPage}
                            workspaceId={workspace.id}
                        />
                        <DeleteBoardDialog id={board.id} workspaceId={workspace.id} />
                    </div>
                )}
            </div>
            <hr className="mt-3 mb-5 border" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid  md:grid-cols-4 gap-4 ">
                    <SortableContext items={lists.map((list) => list.id)}>
                        {lists.map((list) => (
                            <List
                                key={list.id}
                                list={list}
                                cards={getCardsByListId(list.id, cards)}
                                setCards={setCards}
                                renderPage={renderPage}
                            />
                        ))}
                    </SortableContext>
                    {board && <CreateListDialog boardId={board.id} onCreate={renderPage} />}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeList && (
                            <List
                                list={activeList}
                                cards={getCardsByListId(activeList.id, cards)}
                                setCards={setCards}
                                renderPage={renderPage}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </section>
    )
}

export default BoardPage
