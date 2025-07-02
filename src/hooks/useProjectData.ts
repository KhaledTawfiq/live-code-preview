import { useState, useEffect } from 'react';

interface ProjectData {
  projectInfo: {
    name: string;
    description: string;
    type: string;
    technologies: string[];
    createdAt: string;
  };
  structure: Record<string, unknown>;
  files: Record<string, {
    type: string;
    purpose: string;
    content: string;
    [key: string]: unknown;
  }>;
  features: {
    core: string[];
    technical: string[];
  };
  dependencies: {
    runtime: Record<string, string>;
    development: Record<string, string>;
  };
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
