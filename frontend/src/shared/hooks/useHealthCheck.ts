import { useState, useEffect } from 'react';

interface HealthData {
  status: string;
  message: string;
  timestamp: string;
  version: string;
  environment: string;
  database: string;
}

export const useHealthCheck = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // ✅ Vite では import.meta.env を使用
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        console.log('🔍 Attempting to fetch from:', `${baseUrl}/health`);
        
        const response = await fetch(`${baseUrl}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: HealthData = await response.json();
        console.log('✅ Health check data:', data);
        setHealthData(data);
      } catch (err) {
        console.error('❌ Detailed error:', err);
        
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setError('CORS エラーまたはネットワークエラーの可能性があります');
        } else {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  return { healthData, isLoading, error };
};