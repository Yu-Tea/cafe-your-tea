import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';

export const HealthCheck: React.FC = () => {
  const { healthData, isLoading, error } = useHealthCheck();

  if (isLoading) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
          <span className="text-yellow-800">API接続確認中...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          ❌ API接続エラー
        </h3>
        <p className="text-red-600 mb-2">エラー内容: {error}</p>
        <p className="text-sm text-red-500">
          バックエンドサーバーが起動しているか確認してください
        </p>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">データが取得できませんでした</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        ✅ API ステータス チェック用
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">ステータス:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              healthData.status === 'ok' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {healthData.status.toUpperCase()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">データベース:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              healthData.database === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {healthData.database}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">バージョン:</span>
            <span className="text-gray-600">{healthData.version}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">環境:</span>
            <span className="text-gray-600">{healthData.environment}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-200">
        <p className="text-green-700 font-medium mb-1">{healthData.message}</p>
        <p className="text-sm text-gray-500">
          最終確認: {new Date(healthData.timestamp).toLocaleString('ja-JP')}
        </p>
      </div>
    </div>
  );
};