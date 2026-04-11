'use client';

import { useState } from 'react';

export default function TranscribePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copiar');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setResult('');
    setError('');
    
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopyStatus('Copiado ✅');
      setTimeout(() => setCopyStatus('Copiar'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50 flex flex-col gap-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bicyclette mb-6 text-gray-800">Transcribir Receta (Internal Tool)</h1>
        
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              TikTok / YouTube URL
            </label>
            <input
              type="text"
              id="url"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="https://www.tiktok.com/@chef/video/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading || !url}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Procesando...
              </span>
            ) : 'Generar Receta'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Resultado:</h2>
            <button
              onClick={handleCopy}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              {copyStatus}
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
              {result}
            </pre>
          </div>
        </div>
      )}
    </main>
  );
}
