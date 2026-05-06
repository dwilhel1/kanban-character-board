import React, { useState } from 'react';
import type { Character, KanbanItem } from '../types';

interface Props {
    characters: Character[];
    onAdd: (item: KanbanItem) => void;
}

export default function AddItemForm({ characters, onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState('');

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!title.trim() || !selectedCharacterId) return;

        const character = characters.find(c => c.id === selectedCharacterId);
        if (!character) return;

        onAdd({
            id: crypto.randomUUID(),
            title: title.trim(),
            character,
            column: 'todo',
        });

        setTitle('');
        setSelectedCharacterId('');
    }

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <input
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="form-input"
            />
            <select
                value={selectedCharacterId}
                onChange={e => setSelectedCharacterId(e.target.value)}
                className="form-select"
            >
                <option value="">Assign a character...</option>
                {characters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <button type="submit" className="form-button">Add Task</button>
        </form>
    );
}