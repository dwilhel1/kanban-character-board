# Kanban Character Board

A Kanban board built with React, TypeScript, and Vite. Tasks are organized across
three columns (To Do, Doing, Done) and each task is assigned a Rick and Morty character
fetched from the public GraphQL API.

## Features

- Create tasks via a form, each assigned a Rick and Morty character
- Drag and drop tasks between columns and reorder within a column
- Confetti animation when a task is moved to Done
- Character data fetched from the Rick and Morty GraphQL API

## Prerequisites

- Node.js v18+
- Yarn

## Setup

```bash
yarn install
yarn dev
```

Open http://localhost:5173

## Tech Stack

- React 19 + TypeScript
- Vite
- @dnd-kit for drag and drop
- graphql-request for GraphQL API calls
- canvas-confetti for the Done animation

## Project Structure

- `src/types.ts` - shared TypeScript types (Column, Character, KanbanItem)
- `src/api.ts` - GraphQL fetch for Rick and Morty characters
- `src/App.tsx` - main app, holds all state and drag and drop logic
- `src/components/Column.tsx` - a single kanban column with droppable context
- `src/components/KanbanCard.tsx` - a draggable task card
- `src/components/AddItemForm.tsx` - form to create new tasks