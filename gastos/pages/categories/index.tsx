import { Category } from '@prisma/client';
import { api } from 'lib/api/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { FaChevronLeft } from 'react-icons/fa';
import useSWR from 'swr';

const CategoriesPage: NextPage = () => {
  const categoriesQuery = useSWR<Category[]>('/categories');

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const list = Array.from(categoriesQuery.data || []);
    const [removed] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, removed);

    const orderedList = list.map((item, index) => ({ ...item, order: index }));

    await api.patch('/categories', orderedList);
    categoriesQuery.mutate(orderedList, {
      optimisticData: orderedList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full flex-col">
        <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
          <Link href="/sheets">
            <a>
              <FaChevronLeft className="text-2xl" />
            </a>
          </Link>
          <h1>Categories</h1>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto bg-gray-900">
          <Droppable droppableId="droppable">
            {(dropProvided) => {
              return (
                <div
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                >
                  {categoriesQuery.data?.map((category, index) => (
                    <Draggable
                      key={category.id}
                      draggableId={category.id}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <Link href={`/edit-category/${category.id}`}>
                            <a className="block border-b border-gray-700 p-4 text-white">
                              {category.name}
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
          <Link href="/create-category">
            <a className="block bg-blue-400 p-4 text-center font-semibold text-white">
              Create Category
            </a>
          </Link>
        </div>
      </div>
    </DragDropContext>
  );
};

export default CategoriesPage;
