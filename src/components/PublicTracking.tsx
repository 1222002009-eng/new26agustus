import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function PublicTracking() {
  const [noSurat, setNoSurat] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const { state } = useApp();

  const handleSearch = () => {
    const report = state.reports.find(r => r.noSurat === noSurat);
    setSearchResult(report || false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Lacak Status Surat
          </h1>
          
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={noSurat}
              onChange={(e) => setNoSurat(e.target.value)}
              placeholder="Masukkan Nomor Surat (contoh: 001/SDM/2025)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Lacak
            </button>
          </div>

          {searchResult === false && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Surat Tidak Ditemukan</h3>
              <p className="text-gray-600">Nomor surat yang Anda masukkan tidak ditemukan dalam sistem.</p>
            </div>
          )}

          {searchResult && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Informasi Surat</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">No. Surat:</span> {searchResult.noSurat}
                  </div>
                  <div>
                    <span className="font-medium">Hal:</span> {searchResult.hal}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      searchResult.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                      searchResult.status === 'Dalam Proses' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {searchResult.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Layanan:</span> {searchResult.layanan}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Timeline Proses</h3>
                <div className="space-y-4">
                  {searchResult.workflow.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(step.status)}
                        {index < searchResult.workflow.length - 1 && (
                          <div className="w-px h-8 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{step.action}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-700' :
                            step.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {step.status === 'completed' ? 'Selesai' :
                             step.status === 'in-progress' ? 'Sedang Diproses' : 'Menunggu'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {step.user} • {new Date(step.timestamp).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
