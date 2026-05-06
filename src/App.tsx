import { useEffect, useState } from 'react';
import { DndContext, type DragEndEvent, type DragOverEvent, type DragStartEvent, closestCorners, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import confetti from 'canvas-confetti';
import type { Character, KanbanItem, Column } from './types';
import { fetchCharacters } from './api';
import AddItemForm from './components/AddItemForm';
import ColumnComponent from './components/Column';
import KanbanCard from "./components/KanbanCard.tsx";

const COLUMNS: { id: Column; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'Doing' },
  { id: 'done', title: 'Done' },
];

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [items, setItems] = useState<KanbanItem[]>([]);
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);

  useEffect(() => {
    fetchCharacters().then(setCharacters);
  }, []);

  function handleAddItem(item: KanbanItem) {
    setItems(prev => [...prev, item]);
  }

  function getTargetColumn(activeId: string, overId: string): Column {
    const activeItem = items.find(i => i.id === activeId);
    const overColumn = COLUMNS.find(c => c.id === overId);
    const overItem = items.find(i => i.id === overId);
    return overColumn?.id ?? overItem?.column ?? activeItem?.column ?? 'todo';
  }

  function handleDragStart(event: DragStartEvent) {
    const item = items.find(i => i.id === event.active.id);
    setActiveItem(item ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const targetColumn = getTargetColumn(String(active.id), String(over.id));
    const activeItem = items.find(i => i.id === active.id);
    if (activeItem && activeItem.column !== targetColumn) {
      setItems(prev =>
          prev.map(i => i.id === active.id ? { ...i, column: targetColumn } : i)
      );
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;
    const targetColumn = getTargetColumn(String(active.id), String(over.id));
    if (targetColumn === 'done') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
    setItems(prev => {
      const oldIndex = prev.findIndex(i => i.id === active.id);
      const overItem = items.find(i => i.id === over.id);
      const newIndex = overItem ? prev.findIndex(i => i.id === over.id) : prev.length;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
      <div className="app">
        <h1 className="app-title">Kanban Board</h1>
        <AddItemForm characters={characters} onAdd={handleAddItem} />
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
          <div className="board">
            {COLUMNS.map(col => (
                <ColumnComponent
                    key={col.id}
                    column={col.id}
                    title={col.title}
                    items={items.filter(i => i.column === col.id)}
                />
            ))}
          </div>
          <DragOverlay>
            {activeItem ? <KanbanCard item={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
  );
}