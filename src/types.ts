export type Column = 'todo' | 'doing' | 'done';

export interface Character {
    id: string;
    name: string;
    image: string;
}

export interface KanbanItem {
    id: string;
    title: string;
    character: Character;
    column: Column;
}
