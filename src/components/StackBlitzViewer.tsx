import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProjectData } from '../hooks/useProjectData';
import sdk from '@stackblitz/sdk';

const SimpleStackBlitzViewer2: React.FC = () => {
  const { projectData, loading, error, retry } = useProjectData();
  const [selectedView, setSelectedView] = useState<'vanilla' | 'react'>('react');
  const [isEmbedding, setIsEmbedding] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  const createAndEmbedProject = useCallback(async () => {
    if (!projectData || !embedRef.current) return;

    setIsEmbedding(true);

    try {
      const projectFiles: Record<string, string> = {};

      if (selectedView === 'react') {        // React project files
        projectFiles['index.html'] = [
          '<!DOCTYPE html>',
          '<html lang="en">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>TaskMaster Todo App</title>',
          '  <script src="https://cdn.tailwindcss.com"></script>',
          '</head>',
          '<body>',
          '  <div id="root"></div>',
          '  <script type="module" src="/index.js"></script>',
          '</body>',
          '</html>'
        ].join('\n');

        projectFiles['package.json'] = JSON.stringify({
          "name": "taskmaster-todo",
          "version": "1.0.0",
          "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
          }
        }, null, 2);

        projectFiles['index.js'] = [
          "import React from 'react';",
          "import { createRoot } from 'react-dom/client';",
          "import App from './App.js';",
          "",
          "const container = document.getElementById('root');",
          "const root = createRoot(container);",
          "root.render(React.createElement(App));"
        ].join('\n');

        const appCode = [
          "import React, { useState } from 'react';",
          "",
          "function App() {",
          "  const [todos, setTodos] = useState([]);",
          "  const [inputValue, setInputValue] = useState('');",
          "  const [filter, setFilter] = useState('all');",
          "",
          "  const addTodo = () => {",
          "    if (inputValue.trim()) {",
          "      setTodos([...todos, {",
          "        id: Date.now(),",
          "        text: inputValue,",
          "        completed: false",
          "      }]);",
          "      setInputValue('');",
          "    }",
          "  };",
          "",
          "  const toggleTodo = (id) => {",
          "    setTodos(todos.map(todo => ",
          "      todo.id === id ? { ...todo, completed: !todo.completed } : todo",
          "    ));",
          "  };",
          "",
          "  const deleteTodo = (id) => {",
          "    setTodos(todos.filter(todo => todo.id !== id));",
          "  };",
          "",
          "  const filteredTodos = todos.filter(todo => {",
          "    if (filter === 'active') return !todo.completed;",
          "    if (filter === 'completed') return todo.completed;",
          "    return true;",
          "  });",
          "",
          "  return React.createElement('div', {",
          "    className: 'min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8'",
          "  },",
          "    React.createElement('div', {",
          "      className: 'max-w-md mx-auto bg-white rounded-lg shadow-lg p-6'",
          "    },",
          "      React.createElement('h1', {",
          "        className: 'text-2xl font-bold text-center mb-6 text-gray-800'",
          "      }, 'TaskMaster'),",
          "      ",
          "      React.createElement('div', {",
          "        className: 'flex gap-2 mb-4'",
          "      },",
          "        React.createElement('input', {",
          "          type: 'text',",
          "          value: inputValue,",
          "          onChange: (e) => setInputValue(e.target.value),",
          "          onKeyPress: (e) => e.key === 'Enter' && addTodo(),",
          "          placeholder: 'What needs to be done?',",
          "          className: 'flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'",
          "        }),",
          "        React.createElement('button', {",
          "          onClick: addTodo,",
          "          className: 'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'",
          "        }, 'Add')",
          "      ),",
          "      ",
          "      React.createElement('div', {",
          "        className: 'flex gap-2 mb-4'",
          "      },",
          "        ['all', 'active', 'completed'].map(filterType =>",
          "          React.createElement('button', {",
          "            key: filterType,",
          "            onClick: () => setFilter(filterType),",
          "            className: `px-3 py-1 rounded ${filter === filterType ? 'bg-blue-500 text-white' : 'bg-gray-200'}`",
          "          }, filterType.charAt(0).toUpperCase() + filterType.slice(1))",
          "        )",
          "      ),",
          "      ",
          "      React.createElement('div', {",
          "        className: 'space-y-2'",
          "      },",
          "        filteredTodos.map(todo =>",
          "          React.createElement('div', {",
          "            key: todo.id,",
          "            className: `flex items-center gap-2 p-2 rounded ${todo.completed ? 'bg-gray-100' : 'bg-white border'}`",
          "          },",
          "            React.createElement('input', {",
          "              type: 'checkbox',",
          "              checked: todo.completed,",
          "              onChange: () => toggleTodo(todo.id),",
          "              className: 'w-4 h-4'",
          "            }),",
          "            React.createElement('span', {",
          "              className: `flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`",
          "            }, todo.text),",
          "            React.createElement('button', {",
          "              onClick: () => deleteTodo(todo.id),",
          "              className: 'text-red-500 hover:text-red-700'",
          "            }, '✕')",
          "          )",
          "        )",
          "      ),",
          "      ",
          "      React.createElement('div', {",
          "        className: 'mt-4 text-center text-sm text-gray-500'",
          "      }, `${todos.filter(t => !t.completed).length} items left`)",
          "    )",
          "  );",
          "}",
          "",
          "export default App;"
        ].join('\n');

        projectFiles['App.js'] = appCode;

      } else {
        // Vanilla JavaScript version
        const htmlCode = [
          '<!DOCTYPE html>',
          '<html lang="en">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>TaskMaster Todo App</title>',
          '  <script src="https://cdn.tailwindcss.com"></script>',
          '</head>',
          '<body>',
          '  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">',
          '    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">',
          '      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">TaskMaster</h1>',
          '      ',
          '      <div class="flex gap-2 mb-4">',
          '        <input ',
          '          type="text" ',
          '          id="todoInput"',
          '          placeholder="What needs to be done?"',
          '          class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"',
          '        >',
          '        <button ',
          '          onclick="addTodo()" ',
          '          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"',
          '        >',
          '          Add',
          '        </button>',
          '      </div>',
          '      ',
          '      <div class="flex gap-2 mb-4">',
          '        <button onclick="setFilter(\'all\')" id="filterAll" class="px-3 py-1 rounded bg-blue-500 text-white">All</button>',
          '        <button onclick="setFilter(\'active\')" id="filterActive" class="px-3 py-1 rounded bg-gray-200">Active</button>',
          '        <button onclick="setFilter(\'completed\')" id="filterCompleted" class="px-3 py-1 rounded bg-gray-200">Completed</button>',
          '      </div>',
          '      ',
          '      <div id="todoList" class="space-y-2"></div>',
          '      ',
          '      <div id="todoCount" class="mt-4 text-center text-sm text-gray-500">0 items left</div>',
          '    </div>',
          '  </div>',
          '',
          '  <script>',
          '    let todos = [];',
          '    let currentFilter = "all";',
          '',
          '    function addTodo() {',
          '      const input = document.getElementById("todoInput");',
          '      const text = input.value.trim();',
          '      ',
          '      if (text) {',
          '        todos.push({',
          '          id: Date.now(),',
          '          text: text,',
          '          completed: false',
          '        });',
          '        input.value = "";',
          '        renderTodos();',
          '      }',
          '    }',
          '',
          '    function toggleTodo(id) {',
          '      todos = todos.map(todo => ',
          '        todo.id === id ? { ...todo, completed: !todo.completed } : todo',
          '      );',
          '      renderTodos();',
          '    }',
          '',
          '    function deleteTodo(id) {',
          '      todos = todos.filter(todo => todo.id !== id);',
          '      renderTodos();',
          '    }',
          '',
          '    function setFilter(filter) {',
          '      currentFilter = filter;',
          '      document.querySelectorAll("[id^=\'filter\']").forEach(btn => {',
          '        btn.className = "px-3 py-1 rounded bg-gray-200";',
          '      });',
          '      document.getElementById("filter" + filter.charAt(0).toUpperCase() + filter.slice(1)).className = "px-3 py-1 rounded bg-blue-500 text-white";',
          '      renderTodos();',
          '    }',
          '',
          '    function renderTodos() {',
          '      const todoList = document.getElementById("todoList");',
          '      const todoCount = document.getElementById("todoCount");',
          '      ',
          '      const filteredTodos = todos.filter(todo => {',
          '        if (currentFilter === "active") return !todo.completed;',
          '        if (currentFilter === "completed") return todo.completed;',
          '        return true;',
          '      });',
          '      ',
          '      todoList.innerHTML = filteredTodos.map(todo => `',
          '        <div class="flex items-center gap-2 p-2 rounded ${todo.completed ? \'bg-gray-100\' : \'bg-white border\'}">',
          '          <input ',
          '            type="checkbox" ',
          '            ${todo.completed ? \'checked\' : \'\'} ',
          '            onchange="toggleTodo(${todo.id})"',
          '            class="w-4 h-4"',
          '          >',
          '          <span class="flex-1 ${todo.completed ? \'line-through text-gray-500\' : \'\'}">${todo.text}</span>',
          '          <button ',
          '            onclick="deleteTodo(${todo.id})"',
          '            class="text-red-500 hover:text-red-700"',
          '          >✕</button>',
          '        </div>',
          '      `).join("");',
          '      ',
          '      const activeCount = todos.filter(t => !t.completed).length;',
          '      todoCount.textContent = `${activeCount} items left`;',
          '    }',
          '',
          '    // Allow Enter key to add todo',
          '    document.getElementById("todoInput").addEventListener("keypress", function(e) {',
          '      if (e.key === "Enter") {',
          '        addTodo();',
          '      }',
          '    });',
          '  </script>',
          '</body>',
          '</html>'
        ].join('\n');

        projectFiles['index.html'] = htmlCode;
      }

      // Embed the project using StackBlitz SDK
      await sdk.embedProject(
        embedRef.current,
        {
          title: projectData.projectInfo.name,
          description: projectData.projectInfo.description,
          template: 'javascript',
          files: projectFiles,
        },
        {
          height: 600,
          openFile: selectedView === 'react' ? 'App.js' : 'index.html',
          view: 'preview',
          hideNavigation: false,
          hideDevTools: false
        }
      );

    } catch (error) {
      console.error('Error embedding StackBlitz project:', error);
    } finally {
      setIsEmbedding(false);
    }
  }, [projectData, selectedView]);

  useEffect(() => {
    if (projectData && embedRef.current) {
      // Clear previous embed
      embedRef.current.innerHTML = '';
      createAndEmbedProject();
    }
  }, [projectData, selectedView, createAndEmbedProject]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">Failed to load project data</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">No project data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {projectData.projectInfo.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {projectData.projectInfo.description}
          </p>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <button
              onClick={() => setSelectedView('react')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'react'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              React Version
            </button>
            <button
              onClick={() => setSelectedView('vanilla')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'vanilla'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Vanilla JS
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* StackBlitz Embedded View */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">
                  Live Preview - {selectedView === 'react' ? 'React' : 'Vanilla JavaScript'}
                </h2>
                {isEmbedding && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    Loading project...
                  </div>
                )}
              </div>
              
              <div 
                ref={embedRef}
                className="w-full"
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>

          {/* Project Info Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Core Features</h3>
              <ul className="space-y-2">
                {projectData.features.core.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Features */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Technical Features</h3>
              <ul className="space-y-2">
                {projectData.features.technical.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-0.5">⚡</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dependencies */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Key Dependencies</h3>
              <div className="space-y-2">
                {Object.entries(projectData.dependencies.runtime).slice(0, 3).map(([name, version]) => (
                  <div key={name} className="flex justify-between items-center text-sm">
                    <span className="font-mono text-blue-600">{name}</span>
                    <span className="text-gray-500">{version}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleStackBlitzViewer2;
