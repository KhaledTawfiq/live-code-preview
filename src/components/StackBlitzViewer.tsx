import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProjectData } from '../hooks/useProjectData';
import sdk from '@stackblitz/sdk';

const SimpleStackBlitzViewer2: React.FC = () => {
  const { projectData, loading, error, retry } = useProjectData();
  const [isEmbedding, setIsEmbedding] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  // Helper function to recursively extract files from appFiles structure
  const extractFilesFromAppFiles = (appFiles: any): Record<string, string> => {
    const files: Record<string, string> = {};
    
    Object.entries(appFiles).forEach(([path, fileData]: [string, any]) => {
      if (fileData.type === 'file' && fileData.contents) {
        files[path] = fileData.contents;
      }
    });
    
    return files;
  };

  const createAndEmbedProject = useCallback(async () => {
    if (!projectData || !embedRef.current) return;

    setIsEmbedding(true);

    try {
      const projectFiles: Record<string, string> = {};

      // Extract all files from the new appFiles structure
      const extractedFiles = extractFilesFromAppFiles(projectData.appFiles);

      // Add all files from project data directly (no conversion needed)
      Object.entries(extractedFiles).forEach(([filePath, content]) => {
        // Add all files as-is from the JSON data
        if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || 
            filePath.endsWith('.js') || filePath.endsWith('.jsx') ||
            filePath.endsWith('.css') || filePath.endsWith('.json') ||
            filePath.endsWith('.md') || filePath.endsWith('.gitignore') ||
            filePath === 'index.html') {
          
          projectFiles[filePath] = content;
        }
      });

      // Embed the project using StackBlitz SDK with TypeScript template
      await sdk.embedProject(
        embedRef.current,
        {
          title: "TodoFlow - React Todo App",
          description: "A beautiful, modern todo application built with React, TypeScript and Tailwind CSS",
          template: 'node', // Use node template for full TypeScript support
          files: projectFiles,
        },
        {
          height: 600,
          openFile: 'src/App.tsx',
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
  }, [projectData, extractFilesFromAppFiles]);

  useEffect(() => {
    if (projectData && embedRef.current) {
      // Clear previous embed
      embedRef.current.innerHTML = '';
      createAndEmbedProject();
    }
  }, [projectData, createAndEmbedProject]);

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
    <div className="min-h-screen bg-gray-50" style={{ width: '1200px' }}>
      <div className="container mx-auto px-4 py-8">
       

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* StackBlitz Embedded View */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">
                  Live Preview - React
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


        
        </div>
      </div>
    </div>
  );
};

export default SimpleStackBlitzViewer2;
