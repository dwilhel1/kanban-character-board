import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { KanbanItem } from '../types';

interface Props {
    item: KanbanItem;
}

export default function KanbanCard({ item }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="kanban-card"
        >
            <img src={item.character.image} alt={item.character.name} />
            <div className="card-content">
                <p className="card-title">{item.title}</p>
                <p className="card-character">{item.character.name}</p>
            </div>
        </div>
    );
}
