# Generate Complete project-data.json

**USER REQUEST:** Create a full modern task management app 

---

## Task
Generate a complete `project-data.json` file with ALL functional components, not just configuration files.

## Required Structure
```typescript
interface FileNode {
  name: string;
  type: "file";
  contents: string;
  fullPath: string;
}

interface FolderNode {
  name: string;
  type: "folder";
}

interface ProjectData {
  appFiles: { [key: string]: FileNode | FolderNode };
}
```

## Essential Requirements

### Must Include
- Complete `src/App.tsx` with full functionality
- At least 5-10 functional components in `src/components/`
- Custom hooks in `src/hooks/`
- TypeScript interfaces in `src/types/`
- State management in `src/store/`
- Mock data in `src/data/`
- All base config files (package.json, tsconfig.json, vite.config.ts, etc.)

### Tech Stack
React 18 + TypeScript + Tailwind CSS + Zustand + React Query v5 + Framer Motion + Lucide React

**IMPORTANT:** Only include essential production dependencies. DO NOT include testing libraries, linting tools, or development-only packages that can cause version conflicts.

### React Query v5 Usage
- Use object syntax for all query functions: `useQuery({ queryKey: ['key'], queryFn: () => fetch() })`
- NOT the old syntax: `useQuery(['key'], () => fetch())`
- Use `queryClient.invalidateQueries({ queryKey: ['key'] })` instead of `queryClient.invalidateQueries(['key'])`
- Mutations: `useMutation({ mutationFn: (data) => api.post(data) })`

### JSON Rules
- **CRITICAL: Output must be PURE JSON with NO COMMENTS whatsoever – comments are not permitted in JSON.**
- **NO CODE COMMENTS**: Never include `//` or `/* */` comments anywhere in the JSON output
- **All string values must be properly escaped** with `\"` for quotes and `\\` for backslashes
- **Newlines**: Use `\n` for newlines, never actual line breaks in JSON strings
- **No trailing commas**: JSON must be valid and parseable by `JSON.parse()`
- **All property names**: Must be in double quotes
- **String escaping**: Any `"` inside contents must be escaped as `\"`, any `\` must be escaped as `\\`
- **Validation**: Must pass `JSON.parse()` test - invalid JSON will cause errors
- **Example**: The string `import { useState } from "react";` should be written as `"import { useState } from \\"react\\";"`
- **CRITICAL**: Never use Unicode escape sequences like `\u` - use proper JSON string escaping only
- **WRONG**: `"contents": "{\n  "name": "app",\n  "type": "module"\n}"` (INVALID - causes parsing errors)
- **CORRECT**: `"contents": "{\\n  \\"name\\": \\"app\\",\\n  \\"type\\": \\"module\\"\\n}"` (VALID - properly escaped)
- **ABSOLUTELY FORBIDDEN**: Any comments like `// This is a comment` or `/* comment */` in the JSON output


### Content Quality
- Every component must have real logic, not placeholders
- Include realistic mock data with actual content
- Implement working state management
- Add proper error handling and loading states
- Use modern UI patterns and smooth animations
- Follow responsive design principles with mobile-first approach
- **CRITICAL**: Always use real Unsplash image URLs, never placeholder.com or fake image URLs

### UI/UX Design Rules
- **Modern Design**: Clean, minimalist layouts with proper whitespace and card-based components
- **Color Palette**: Use consistent color scheme (slate/gray base with accent colors like blue, emerald, or purple)
- **Typography**: Implement proper font hierarchy (text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl)
- **Spacing**: Follow 4px scale for consistent spacing (p-1, p-2, p-4, p-6, p-8, p-12, p-16)
- **Responsive Design**: Mobile-first approach with breakpoints (sm:, md:, lg:, xl:)
- **Interactive Elements**: Add hover states, transitions, and micro-animations using Framer Motion
- **Shadows & Borders**: Use subtle shadows (shadow-sm, shadow-md) and rounded corners (rounded-lg, rounded-xl)
- **Accessibility**: Include ARIA labels, keyboard navigation, and proper contrast ratios

### Image Handling
- **NEVER use placeholder images**: Always use real Unsplash URLs, never placeholder.com or any fake URLs
- **Required Format**: `https://images.unsplash.com/photo-[REAL_ID]?w=400&h=300&fit=crop&crop=center`
- **Real Sample IDs**: 1560472354-f64debc01fc4 (tech), 1516724562-f3c73a43e31c (food), 1441986300917-64674bd600d8 (fashion), 1507003211169-0a1dd7ef0a96 (nature), 1519389950473-47ba0277781c (business)
- **More Real IDs**: 1486312338019-9ce5c02b013e (workspace), 1551434678-e076c223a692 (people), 1542281286-9e0a746e9067 (city), 1505740420928-5e560c06d30e (coffee), 1574180045827-681f8a1a9622 (electronics)
- **Optimization**: Include alt text, aspect-ratio classes, and object-fit utilities
- **Responsive**: Use responsive image classes (w-full, h-48, object-cover)
- **Error Handling**: Add onError handlers for failed image loads, fallback to other real Unsplash URLs
- **Loading States**: Implement skeleton screens and lazy loading

## Base Template
Extend this with your app-specific files:
```json
{
  "appFiles": {
    "src": {"name": "src", "type": "folder"},
    "package.json": {"name": "package.json", "type": "file", "contents": "{\\n  \\\"name\\\": \\\"modern-app\\\",\\n  \\\"private\\\": true,\\n  \\\"version\\\": \\\"1.0.0\\\",\\n  \\\"type\\\": \\\"module\\\",\\n  \\\"scripts\\\": {\\n    \\\"dev\\\": \\\"vite\\\",\\n    \\\"build\\\": \\\"vite build\\\",\\n    \\\"preview\\\": \\\"vite preview\\\"\\n  },\\n  \\\"dependencies\\\": {\\n    \\\"react\\\": \\\"^18.3.1\\\",\\n    \\\"react-dom\\\": \\\"^18.3.1\\\",\\n    \\\"zustand\\\": \\\"^4.5.2\\\",\\n    \\\"@tanstack/react-query\\\": \\\"^5.28.0\\\",\\n    \\\"framer-motion\\\": \\\"^11.0.17\\\",\\n    \\\"lucide-react\\\": \\\"^0.367.0\\\",\\n    \\\"clsx\\\": \\\"^2.1.1\\\"\\n  },\\n  \\\"devDependencies\\\": {\\n    \\\"@types/react\\\": \\\"^18.3.5\\\",\\n    \\\"@types/react-dom\\\": \\\"^18.3.0\\\",\\n    \\\"@vitejs/plugin-react\\\": \\\"^4.3.1\\\",\\n    \\\"typescript\\\": \\\"^5.5.3\\\",\\n    \\\"vite\\\": \\\"^5.4.2\\\",\\n    \\\"tailwindcss\\\": \\\"^3.4.1\\\",\\n    \\\"autoprefixer\\\": \\\"^10.4.18\\\",\\n    \\\"postcss\\\": \\\"^8.4.35\\\"\\n  }\\n}", "fullPath": "package.json"},
    "postcss.config.js": {"name": "postcss.config.js", "type": "file", "contents": "export default {\\n  plugins: {\\n    tailwindcss: {},\\n    autoprefixer: {},\\n  },\\n};", "fullPath": "postcss.config.js"},
    "tailwind.config.js": {"name": "tailwind.config.js", "type": "file", "contents": "/** @type {import('tailwindcss').Config} */\\nexport default {\\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n};", "fullPath": "tailwind.config.js"},
    "vite.config.ts": {"name": "vite.config.ts", "type": "file", "contents": "import { defineConfig } from 'vite';\\nimport react from '@vitejs/plugin-react';\\n\\nexport default defineConfig({\\n  plugins: [react()],\\n});", "fullPath": "vite.config.ts"},
    "tsconfig.json": {"name": "tsconfig.json", "type": "file", "contents": "{\\n  \\\"compilerOptions\\\": {\\n    \\\"target\\\": \\\"ES2020\\\",\\n    \\\"useDefineForClassFields\\\": true,\\n    \\\"lib\\\": [\\\"ES2020\\\", \\\"DOM\\\", \\\"DOM.Iterable\\\"],\\n    \\\"module\\\": \\\"ESNext\\\",\\n    \\\"skipLibCheck\\\": true,\\n    \\\"moduleResolution\\\": \\\"bundler\\\",\\n    \\\"allowImportingTsExtensions\\\": true,\\n    \\\"resolveJsonModule\\\": true,\\n    \\\"isolatedModules\\\": true,\\n    \\\"noEmit\\\": true,\\n    \\\"jsx\\\": \\\"react-jsx\\\",\\n    \\\"strict\\\": true,\\n    \\\"noUnusedLocals\\\": true,\\n    \\\"noUnusedParameters\\\": true,\\n    \\\"noFallthroughCasesInSwitch\\\": true\\n  },\\n  \\\"include\\\": [\\\"src\\\"],\\n  \\\"references\\\": [{ \\\"path\\\": \\\"./tsconfig.node.json\\\" }]\\n}", "fullPath": "tsconfig.json"},
    "tsconfig.node.json": {"name": "tsconfig.node.json", "type": "file", "contents": "{\\n  \\\"compilerOptions\\\": {\\n    \\\"composite\\\": true,\\n    \\\"skipLibCheck\\\": true,\\n    \\\"module\\\": \\\"ESNext\\\",\\n    \\\"moduleResolution\\\": \\\"bundler\\\",\\n    \\\"allowSyntheticDefaultImports\\\": true\\n  },\\n  \\\"include\\\": [\\\"vite.config.ts\\\"]\\n}", "fullPath": "tsconfig.node.json"},
    "index.html": {"name": "index.html", "type": "file", "contents": "<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n  <head>\\n    <meta charset=\\\"UTF-8\\\" />\\n    <link rel=\\\"icon\\\" type=\\\"image/svg+xml\\\" href=\\\"/vite.svg\\\" />\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\" />\\n    <title>Modern App</title>\\n  </head>\\n  <body>\\n    <div id=\\\"root\\\"></div>\\n    <script type=\\\"module\\\" src=\\\"/src/main.tsx\\\"></script>\\n  </body>\\n</html>", "fullPath": "index.html"},
    "src/main.tsx": {"name": "main.tsx", "type": "file", "contents": "import { StrictMode } from 'react';\\nimport { createRoot } from 'react-dom/client';\\nimport App from './App';\\nimport './index.css';\\n\\ncreateRoot(document.getElementById('root')!).render(\\n  <StrictMode>\\n    <App />\\n  </StrictMode>\\n);", "fullPath": "src/main.tsx"},
    "src/index.css": {"name": "index.css", "type": "file", "contents": "@tailwind base;\\n@tailwind components;\\n@tailwind utilities;", "fullPath": "src/index.css"}
  }
}
```

## Package Dependencies Rules
- **Production Dependencies**: Only include packages actually used in the app code
- **Development Dependencies**: Only include essential build tools (Vite, TypeScript, Tailwind)
- **Avoid**: Testing libraries, linting tools, formatters, or any packages that can cause version conflicts
- **Core Required**: react, react-dom, zustand, @tanstack/react-query, framer-motion, lucide-react, clsx
- **Dev Required**: @types/react, @types/react-dom, @vitejs/plugin-react, typescript, vite, tailwindcss
- **React Query v5**: Always use object syntax for queries and mutations, not the old array syntax
- **CRITICAL**: If you use any additional packages in your code (like react-hot-toast), you MUST include them in package.json dependencies

## Output Format
Return ONLY valid JSON matching the structure above. No explanations.

**IMPORTANT:** Output must be valid, parseable JSON with no comments.
**IMPORTANT:** Must include complete functional app code with real business logic, not just configuration files.
