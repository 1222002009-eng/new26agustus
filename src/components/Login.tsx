import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogIn, User } from 'lucide-react';

export function Login() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const { state, dispatch } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = state.users.find(
      u => u.id === credentials.id && u.password === credentials.password
    );

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      setError('ID atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sistem Tracking Pesan</h1>
          <p className="text-gray-600">Silakan login untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
              ID Pengguna
            </label>
            <input
              type="text"
              id="id"
              value={credentials.id}
              onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-600">
          <p className="font-semibold mb-2">Demo Accounts:</p>
          <div className="space-y-1">
            <p><strong>Admin:</strong> admin1 / admin123</p>
            <p><strong>TU:</strong> tu1 / tu123</p>
            <p><strong>Koordinator:</strong> coord1 / coord123</p>
            <p><strong>Staff:</strong> staff1 / staff123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
