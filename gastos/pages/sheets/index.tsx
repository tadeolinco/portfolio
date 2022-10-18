import { Sheet } from "@prisma/client";
import { api } from "lib/api/api";
import Link from "next/link";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { FaBox } from "react-icons/fa";
import useSWR from "swr";

const SheetsPage = () => {
  const sheetsQuery = useSWR<Sheet[]>("/sheets");

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const list = Array.from(sheetsQuery.data || []);
    const [removed] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, removed);

    const orderedList = list.map((item, index) => ({ ...item, order: index }));

    await api.patch("/sheets", orderedList);
    sheetsQuery.mutate(orderedList, {
      optimisticData: orderedList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col h-full">
        <div className="p-4 bg-blue-400 flex space-x-4 items-center justify-between text-xl text-white">
          <h1>Sheets</h1>

          <div className="flex space-x-4 items-center">
            <Link href="/categories">
              <FaBox />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto bg-gray-900">
          <Droppable droppableId="droppable">
            {(dropProvided) => {
              return (
                <div
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                >
                  {sheetsQuery.data?.map((sheet, index) => (
                    <Draggable
                      key={sheet.id}
                      draggableId={sheet.id}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <Link href={`/sheets/${sheet.id}`}>
                            <a className="p-4 block border-b text-white border-gray-700">
                              {sheet.name}
                            </a>
                          </Link>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
        <div>
          <Link href="/create-sheet">
            <a className="p-4 block text-white bg-blue-400 text-center font-semibold">
              Create Sheet
            </a>
          </Link>
        </div>
      </div>
    </DragDropContext>
  );
};

export default SheetsPage;
