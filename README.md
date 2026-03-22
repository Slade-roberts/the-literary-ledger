# The Literary Ledger

A portfolio website for a literary translator, writer, and editor. Built with React, TypeScript, Vite, shadcn/ui, and Supabase.

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment variables and fill in your Supabase project details:

```bash
cp .env.example .env
```

Set the following variables in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Development

```bash
npm run dev        # Start the development server on http://localhost:8080
```

## Building

```bash
npm run build      # Production build
npm run preview    # Preview the production build locally
```

## Testing

```bash
npm run test       # Run unit tests with Vitest
npm run test:watch # Run unit tests in watch mode
```

## Linting

```bash
npm run lint       # Run ESLint
```
