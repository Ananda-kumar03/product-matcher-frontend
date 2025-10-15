This project implements a comprehensive full-stack fashion matching system. The Frontend is a React application hosted on Netlify, offering user authentication (Signup/Login) and product browsing. The Backend is a Python Flask API running on Render, utilizing MongoDB for user and product data management.

The core feature, Visual Search, is implemented using a machine learning pipeline:

Feature Extraction: The CLIP model (via Hugging Face Transformers) generates 512-dimension vector embeddings from a query image (URL or upload).

Indexing & Search: A pre-built FAISS index enables instantaneous k-Nearest Neighbors (kNN) search to find the most visually similar products among thousands.

The application works perfectly in the local development environment. However, deployment to the Render service failed due to memory constraints. The combined size of the PyTorch ML model, the Transformers library, and the large pre-built FAISS index file (~1GB) exceeds the RAM and disk limits of Render's free tier, preventing the model from loading into memory at startup.

Implemented Features
Feature	Technology	Status	Notes
Backend API	Flask, MongoDB, Render	Deployed (Base API)	Basic routes like Auth/Products load.
Frontend UI	React, Netlify	Deployed	User interface for browsing and search input.
User Management	MongoDB, bcrypt	Functional	Signup and Login routes with hashed passwords.
Product Browsing	MongoDB	Functional	Pagination for general product listing.
Visual Search	CLIP, FAISS, PyTorch	Functional Locally	Disabled on Render due to model memory limits.

Live Frontend URL	User Interface	Live	https://visualproductsmatcher.netlify.app/
Backend API URL	Render API (Base)	Live	https://visual-matcher-api-6qln.onrender.com

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
