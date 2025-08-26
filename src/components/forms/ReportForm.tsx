import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { SERVICES } from '../../types';

export function ReportForm({ report, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    layanan: report?.layanan || '',
    noAgenda: report?.noAgenda || '',
    kelompokAsalSurat: report?.kelompokAsalSurat || '',
    agendaSestama: report?.agendaSestama || '',
    noSurat: report?.noSurat || '',
    hal: report?.hal || '',
    dari: report?.dari || '',
    tanggalAgenda: report?.tanggalAgenda || '',
    tanggalSurat: report?.tanggalSurat || '',
    sifat: report?.sifat || [],
    derajat: report?.derajat || [],
    status: report?.status || 'Dalam Proses'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {report ? 'Edit Laporan' : 'Buat Laporan Baru'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="layanan" className="block text-sm font-medium text-gray-700 mb-2">
                Layanan
              </label>
              <select
                id="layanan"
                name="layanan"
                value={formData.layanan}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Layanan</option>
                {SERVICES.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="noAgenda" className="block text-sm font-medium text-gray-700 mb-2">
                No. Agenda
              </label>
              <input
                type="text"
                id="noAgenda"
                name="noAgenda"
                value={formData.noAgenda}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="kelompokAsalSurat" className="block text-sm font-medium text-gray-700 mb-2">
                Kelompok Asal Surat
              </label>
              <input
                type="text"
                id="kelompokAsalSurat"
                name="kelompokAsalSurat"
                value={formData.kelompokAsalSurat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="agendaSestama" className="block text-sm font-medium text-gray-700 mb-2">
                Agenda Sestama
              </label>
              <input
                type="text"
                id="agendaSestama"
                name="agendaSestama"
                value={formData.agendaSestama}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="noSurat" className="block text-sm font-medium text-gray-700 mb-2">
                No. Surat
              </label>
              <input
                type="text"
                id="noSurat"
                name="noSurat"
                value={formData.noSurat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="hal" className="block text-sm font-medium text-gray-700 mb-2">
                Hal
              </label>
              <input
                type="text"
                id="hal"
                name="hal"
                value={formData.hal}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="dari" className="block text-sm font-medium text-gray-700 mb-2">
                Dari
              </label>
              <input
                type="text"
                id="dari"
                name="dari"
                value={formData.dari}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tanggalAgenda" className="block text-sm font-medium text-gray-700 mb-2">
                Tgl. Agenda
              </label>
              <input
                type="date"
                id="tanggalAgenda"
                name="tanggalAgenda"
                value={formData.tanggalAgenda}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tanggalSurat" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Surat
              </label>
              <input
                type="date"
                id="tanggalSurat"
                name="tanggalSurat"
                value={formData.tanggalSurat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sifat</label>
              <div className="space-y-2">
                {['Biasa', 'Penting', 'Rahasia'].map(sifat => (
                  <label key={sifat} className="flex items-center">
                    <input
                      type="checkbox"
                      value={sifat}
                      checked={formData.sifat.includes(sifat)}
                      onChange={(e) => handleCheckboxChange(e, 'sifat')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{sifat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Derajat</label>
              <div className="space-y-2">
                {['Biasa', 'Segera', 'Kilat'].map(derajat => (
                  <label key={derajat} className="flex items-center">
                    <input
                      type="checkbox"
                      value={derajat}
                      checked={formData.derajat.includes(derajat)}
                      onChange={(e) => handleCheckboxChange(e, 'derajat')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{derajat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unggah Berkas
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" multiple />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {report ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
