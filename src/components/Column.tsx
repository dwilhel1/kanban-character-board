import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { KanbanItem, Column as ColumnType } from '../types';
import KanbanCard from './KanbanCard';

interface Props {
    column: ColumnType;
    title: string;
    items: KanbanItem[];
}

export default function Column({ column, title, items }: Props) {
    const { setNodeRef } = useDroppable({ id: column });

    return (
        <div className="column">
            <h2 className="column-title">{title}</h2>
            <SortableContext
                items={items.map(i => i.id)}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef} className="column-cards">
                    {items.map(item => (
                        <KanbanCard key={item.id} item={item} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
