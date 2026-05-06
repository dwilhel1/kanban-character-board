import React, { useState } from 'react';
import type { Character, KanbanItem } from '../types';

interface Props {
    characters: Character[];
    onAdd: (item: KanbanItem) => void;
}

export default function AddItemForm({ characters, onAdd }: Props) {
    const [title, setTitle] = useState('');
    const [selectedCharacterId, setSelectedCharacterId] = useState('');
    const [errors, setErrors] = useState({ title: false, character: false });

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const newErrors = {
            title: !title.trim(),
            character: !selectedCharacterId,
        };
        setErrors(newErrors);
        if (newErrors.title || newErrors.character) return;

        const character = characters.find(c => c.id === selectedCharacterId)!;
        onAdd({
            id: crypto.randomUUID(),
            title: title.trim(),
            character,
            column: 'todo',
        });

        setTitle('');
        setSelectedCharacterId('');
        setErrors({ title: false, character: false });
    }

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <div className="form-field">
                <input
                    type="text"
                    placeholder="Task title..."
                    value={title}
                    onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: false })); }}
                    className={`form-input ${errors.title ? 'input-error' : ''}`}
                />
                <span className="error-message">{errors.title ? 'Title is required' : ' '}</span>
            </div>
            <div className="form-field">
                <select
                    value={selectedCharacterId}
                    onChange={e => { setSelectedCharacterId(e.target.value); setErrors(prev => ({ ...prev, character: false })); }}
                    className={`form-select ${errors.character ? 'input-error' : ''}`}
                >
                    <option value="">Assign a character...</option>
                    {characters.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <span className="error-message">{errors.character ? 'Character is required' : ' '}</span>
            </div>
            <button type="submit" className="form-button">Add Task</button>
        </form>
    );
}
