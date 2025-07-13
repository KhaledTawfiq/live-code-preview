# Universal Prompt for Generating Modern project-data.json

Generate a `project-data.json` file for any requested app using modern best practices. Follow this structure and requirements:

## TypeScript Interfaces
```typescript
export interface FileNode {
  name: string;
  type: "file";
  contents: string;
  fullPath: string;
}

export interface FolderNode {
  name: string;
  type: "folder";
}

export type ProjectNode = FileNode | FolderNode;

export interface AppFiles {
  [key: string]: ProjectNode;
}

export interface ProjectData {
  appFiles: AppFiles;
}
```

## Base Project Structure Template
Use this as your foundation and extend with app-specific files:

```json
{
  "appFiles": {
    "src": {"name": "src", "type": "folder"},
    ".gitignore": {"name": ".gitignore", "type": "file", "contents": "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n.env\n", "fullPath": ".gitignore"},
    "index.html": {"name": "index.html", "type": "file", "contents": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React + TypeScript</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n", "fullPath": "index.html"},
    "package.json": {"name": "package.json", "type": "file", "contents": "{\n  \"name\": \"vite-react-typescript-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"autoprefixer\": \"^10.4.18\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"postcss\": \"^8.4.35\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"typescript-eslint\": \"^8.3.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}", "fullPath": "package.json"},
    "src/main.tsx": {"name": "main.tsx", "type": "file", "contents": "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n", "fullPath": "src/main.tsx"},
    "src/index.css": {"name": "index.css", "type": "file", "contents": "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n", "fullPath": "src/index.css"},
    "tsconfig.json": {"name": "tsconfig.json", "type": "file", "contents": "{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n", "fullPath": "tsconfig.json"},
    "vite.config.ts": {"name": "vite.config.ts", "type": "file", "contents": "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n});\n", "fullPath": "vite.config.ts"},
    "eslint.config.js": {"name": "eslint.config.js", "type": "file", "contents": "import js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport tseslint from 'typescript-eslint';\n\nexport default tseslint.config(\n  { ignores: ['dist'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ['**/*.{ts,tsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n", "fullPath": "eslint.config.js"},
    "tsconfig.app.json": {"name": "tsconfig.app.json", "type": "file", "contents": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"src\"]\n}\n", "fullPath": "tsconfig.app.json"},
    "tsconfig.node.json": {"name": "tsconfig.node.json", "type": "file", "contents": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n", "fullPath": "tsconfig.node.json"},
    "postcss.config.js": {"name": "postcss.config.js", "type": "file", "contents": "export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n", "fullPath": "postcss.config.js"},
    "tailwind.config.js": {"name": "tailwind.config.js", "type": "file", "contents": "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    \"./index.html\",\n    \"./src/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n", "fullPath": "tailwind.config.js"},
    "src/vite-env.d.ts": {"name": "vite-env.d.ts", "type": "file", "contents": "/// <reference types=\"vite/client\" />\n", "fullPath": "src/vite-env.d.ts"}
  }
}
```

## Step-by-Step Process

### Step 1: Deep Requirements Analysis
When user requests an app (e.g., "store app"), expand into comprehensive analysis:

**Example for "store app":**
```
Beautiful, production-ready store app with modern design, shopping cart, product search, and responsive layout. Clean aesthetic with smooth animations and thoughtful interactions.

Core Features: Product catalog with grid/cards, shopping cart with real-time totals, search/filtering, product detail modals, user auth, responsive design, smooth animations.

Design: Clean minimalist design with sophisticated colors (slate grays, emerald accents), smooth transitions, professional typography, elegant cart drawer, glassmorphism effects, responsive grid.
```

- Identify app type and domain (e-commerce, social, productivity, etc.)
- Define primary user personas and their goals
- Map out complete user journeys and flows
- Identify all required features and components
- Consider accessibility and performance requirements
- **Generate complete file list** with all necessary components, hooks, types, and utilities

### Step 2: Modern Tech Stack Planning
**Core Stack:** React 18+ TypeScript, Tailwind CSS, Framer Motion, Zustand, React Query, React Hook Form, Zod, Lucide React, Vite

**Dependencies to Add:**
- Styling: `@headlessui/react`, `@tailwindcss/forms`, `tailwindcss-animate`
- State: `zustand`, `@tanstack/react-query`
- Forms: `react-hook-form`, `zod`, `@hookform/resolvers`
- Animations: `framer-motion`
- Icons: `lucide-react`
- Utils: `clsx`, `tailwind-merge`

### Step 3: Component Architecture
- Create atomic design components (atoms, molecules, organisms)
- Implement custom hooks for business logic
- Use proper error boundaries and loading states
- Follow TypeScript strict mode
- Maintain flat JSON structure (no nested children arrays)
- **Generate ALL component files** with complete implementations
- **Include proper prop interfaces** and component logic
- **Add realistic mock data** for all components
- **Implement state management** with proper actions and reducers

### Step 4: Modern UI/UX Implementation
- Mobile-first responsive design
- Consistent spacing using 4px scale (4px, 8px, 16px, 24px, 32px, etc.)
- Modern typography with proper hierarchy
- Smooth animations and micro-interactions
- Accessibility (ARIA labels, keyboard navigation, screen reader support)
- Touch-friendly targets (minimum 44px)

### Step 5: Image and Media Assets
Use full URLs from free stock sources:
- Pexels: `https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=500`
- Unsplash: `https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop&crop=center`

### Step 6: Code Quality and Performance
- Feature-based folder structure
- Barrel exports for clean imports
- React.memo optimization for expensive components
- Lazy loading for routes and heavy components
- Proper error handling and user feedback
- Loading states and form validation

### Step 7: Production-Ready Features
- Proper SEO with meta tags and semantic HTML
- Error boundaries and fallback components
- Loading states with skeleton screens
- Form validation with user-friendly messages
- Analytics tracking structure
- Security best practices

### Step 8: JSON Generation and Validation
- Generate syntactically correct JSON
- Properly escape all string content
- Validate structure matches TypeScript interfaces
- Ensure all required properties are present
- Test JSON parseability before output

## App Templates
**E-commerce:** Product catalog, cart, checkout, auth, reviews, wishlist
**Social:** Profiles, posts, feed, interactions, messaging, following
**Productivity:** Tasks, projects, calendar, analytics, teams, collaboration
**CMS:** Rich editor, categories, comments, roles, SEO, scheduling

---

## Final Output Requirements

**OUTPUT ONLY:** Complete, production-ready JSON matching the TypeScript interfaces above. No explanations.

### Pre-Output Validation Steps
1. **Syntax Check:** Verify all JSON syntax is valid
2. **Structure Check:** Ensure all required properties are present
3. **Escaping Check:** Confirm all strings are properly escaped
4. **Parse Test:** Mentally verify the JSON would pass JSON.parse()
5. **Completeness Check:** Verify app has ALL necessary components, not just config files
6. **Functionality Check:** Ensure components have actual logic, not just placeholders
7. **Mock Data Check:** Confirm realistic data is included, not empty arrays/objects

### Output Format
```json
{
  "appFiles": {
    // Configuration files (from base template)
    // src/App.tsx - Complete main app component
    // src/components/* - All functional components
    // src/hooks/* - Custom business logic hooks
    // src/types/* - TypeScript interfaces
    // src/store/* - State management
    // src/utils/* - Helper functions
    // src/data/* - Mock data files
    // Additional files as needed for complete functionality
  }
}
```

**IMPORTANT:** The output must be valid JSON that can be parsed by `JSON.parse()` without errors. Double-check all string escaping and syntax before finalizing.

**IMPORTANT:** Must include complete, functional app code - not just configuration files. Every component must have real logic and functionality.

## JSON Validation Requirements

**IMPORTANT:** The generated JSON must be valid and parseable. Follow these requirements:

### JSON Syntax Rules
- All strings must be properly escaped with double quotes
- No trailing commas after the last element in objects or arrays
- Escape special characters: `\"`, `\\`, `\n`, `\r`, `\t`
- Use `\n` for newlines, not actual line breaks in string values
- All property names must be in double quotes
- Boolean values must be lowercase: `true`, `false`
- No comments allowed in JSON (use only valid JSON syntax)

### String Content Escaping
When adding code content to the `contents` field:
- Escape all double quotes: `"` becomes `\"`
- Escape all backslashes: `\` becomes `\\`
- Replace actual newlines with `\n`
- Replace tabs with appropriate spaces or `\t`

### Example of Proper Escaping:
```json
{
  "contents": "import React from 'react';\n\nconst App = () => {\n  return (\n    <div className=\"app\">\n      <h1>Hello World</h1>\n    </div>\n  );\n};\n\nexport default App;"
}
```

### Validation Checklist
Before outputting JSON, ensure:
- [ ] All strings are properly quoted and escaped
- [ ] No trailing commas
- [ ] All braces and brackets are properly matched
- [ ] No syntax errors that would prevent JSON.parse()
- [ ] All required properties are present for each node type
- [ ] File nodes have `name`, `type`, `contents`, `fullPath`
- [ ] Folder nodes have `name`, `type`

### Common JSON Errors to Avoid
1. **Trailing commas:** `{"key": "value",}` ❌ → `{"key": "value"}` ✅
2. **Unescaped quotes:** `"He said "hello""` ❌ → `"He said \"hello\""` ✅
3. **Literal newlines:** `"line1\nline2"` ❌ → `"line1\\nline2"` ✅
4. **Single quotes:** `{'key': 'value'}` ❌ → `{"key": "value"}` ✅
5. **Undefined values:** `{"key": undefined}` ❌ → `{"key": null}` ✅

## Mandatory Content Requirements

**IMPORTANT:** The generated JSON must include ALL necessary files for a complete, functional app. Not just configuration files.

### Required File Structure for ANY App:
1. **Configuration Files** (from base template)
2. **Main App Component** (`src/App.tsx`) - Complete functional component
3. **Core Components** - At least 5-10 functional components in `src/components/`
4. **Custom Hooks** - Business logic hooks in `src/hooks/`
5. **Type Definitions** - Complete TypeScript interfaces in `src/types/`
6. **Store/State Management** - State management files in `src/store/`
7. **Utility Functions** - Helper functions in `src/utils/`
8. **Styling** - CSS/styling files beyond base Tailwind
9. **Mock Data** - Sample data files in `src/data/`
10. **Assets** - Any additional assets needed

### Content Completeness Requirements:
- **Every component must be fully functional** with proper props, state, and logic
- **Include complete TypeScript interfaces** for all data structures
- **Add realistic mock data** with actual content (not placeholder text)
- **Implement actual business logic** in hooks and utilities
- **Create working state management** with proper actions and reducers
- **Include proper error handling** and loading states
- **Add responsive styling** with Tailwind classes
- **Implement proper routing** if multi-page app

### Example App-Specific Requirements:

**For E-commerce/Store Apps:**
- Product catalog with real product data
- Shopping cart functionality
- User authentication components
- Search and filtering
- Checkout process
- Product details modal
- Category navigation

**For Social Media Apps:**
- User profiles and posts
- Feed with interactions
- Messaging system
- Following/followers
- Content creation forms
- Real-time updates simulation

**For Productivity Apps:**
- Task management with CRUD operations
- Calendar/scheduling
- Project organization
- User dashboard
- Analytics and reporting
- Team collaboration features

### Avoid These Empty Patterns:
❌ **DO NOT generate apps with only:**
- Configuration files (package.json, tsconfig.json, etc.)
- Empty folder structures
- Placeholder components with no logic
- Basic "Hello World" components
- Incomplete state management
- Missing business logic

✅ **DO generate apps with:**
- Complete functional components with real logic
- Working state management with actions
- Realistic mock data and content
- Proper TypeScript interfaces
- Interactive UI elements
- Business logic implementation
- Error handling and loading states

## User Application Request

**TASK:** Generate a complete project-data.json for the following application:

**USER REQUEST:** [Insert the user's actual request here]

**EXAMPLE FORMAT:** "Create a modern e-commerce store app with shopping cart, product search, and user authentication"

---
