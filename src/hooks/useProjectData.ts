import { useState, useEffect } from 'react';

interface ProjectData {
  appFiles: Record<string, {
    name: string;
    type: 'file' | 'folder';
    contents?: string;
    fullPath: string;
    lastModified: number;
    ignored: boolean;
    isBinary?: boolean;
  }>;
  dependencies: {
    jpack: {
      warnings: Record<string, unknown>;
      appDependencies: Record<string, {
        main: string;
        version: string;
        dependencies: Record<string, string>;
      }>;
      resDependencies: Record<string, {
        main?: string;
        dependencies: Record<string, string>;
      }>;
    };
    externalDeps: unknown[];
    externalResources: unknown[];
  };
  settings: {
    compile: {
      action: string;
      trigger: string;
      clearConsole: boolean;
    };
  };
  editedAt: string;
}

export const useProjectData = () => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/project-data.json');
        if (!response.ok) {
          throw new Error(`Failed to load project data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProjectData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading project data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setProjectData(null);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, []);

  const retry = () => {
    setError(null);
    setLoading(true);
    // Trigger useEffect again by updating a dependency
    window.location.reload();
  };

  return {
    projectData,
    loading,
    error,
    retry
  };
};
