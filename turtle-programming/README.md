# Turtle Lab

A React + TypeScript educational site based on the supplied Python Turtle Third Level benchmarks and teaching notes.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Production build

```sh
npm run build
npm run preview
```

## Structure

- `src/components/`: individual React components, each with its own CSS file.
- `src/data/lessons.ts`: six lessons, learning intentions, success criteria, example Python and discussion prompts.
- `src/App.tsx`: navigation between lessons and teaching pages.
- `src/App.css`: page composition; `src/style.css`: shared tokens and base styles.

The shape explorer is a visual model, not a Python interpreter. Learners run Python examples in Thonny. There are no accounts, completion tracking or database connection. Example code and challenges are teaching adaptations; the teacher guide preserves the supplied document's benchmark qualifications. DM Sans loads from Google Fonts, with system font fallbacks.

Source document: https://docs.google.com/document/d/12RruzvcGoMPkN7o0X0Orh-lLMHhhrVhdtEYqg1wp7GQ/edit

