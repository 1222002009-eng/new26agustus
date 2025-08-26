"use client"

import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { Clipboard, Filter, Eye, UserPlus, AlertTriangle } from "lucide-react"
import { SERVICES } from "../../types"
import { ReportDetailsModal } from "../modals/ReportDetailsModal"
import { AddStaffModal } from "../modals/AddStaffModal"
import { RevisionModal } from "../modals/RevisionModal"

export function CoordinatorDashboard() {
  const { state } = useApp()
  const [serviceFilter, setServiceFilter] = useState("")
  const [selectedReport, setSelectedReport] = useState(null)
  const [addStaffReport, setAddStaffReport] = useState(null)
  const [revisionReport, setRevisionReport] = useState(null)

  const assignedReports = state.reports.filter(
    (report) =>
      report.assignedCoordinators?.includes(state.currentUser?.name) ||
      report.currentHolder === state.currentUser?.name,
  )

  const filteredReports = assignedReports.filter((report) => !serviceFilter || report.layanan === serviceFilter)

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "Selesai":
        return "bg-green-100 text-green-800"
      case "in-progress":
      case "Dalam Proses":
        return "bg-yellow-100 text-yellow-800"
      case "revision-required":
      case "Revisi":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "in-progress":
        return "Dalam Proses"
      case "revision-required":
        return "Revisi"
      case "draft":
        return "Draft"
      case "forwarded-to-tu":
        return "Diteruskan ke TU"
      default:
        return status
    }
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
  }

  const handleAddStaff = (report) => {
    setAddStaffReport(report)
  }

  const handleSendRevision = (report) => {
    setRevisionReport(report)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Clipboard className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Koordinator</h1>
        </div>
        <p className="text-gray-600">Verifikasi dokumen dan tugaskan laporan kepada staf</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Laporan Terdistribusi</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Layanan</option>
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Surat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Layanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.noSurat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.hal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}
                    >
                      {getStatusText(report.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{report.layanan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${report.progress || 0}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs text-gray-600">
                        {report.progress || 0}%
                        {report.assignments ? (
                          <span className="text-gray-500">
                            ({report.assignments.filter((a) => a.status === "completed").length}/
                            {report.assignments.length} staff)
                          </span>
                        ) : (
                          <span className="text-gray-500">(0/0 staff)</span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => handleAddStaff(report)}
                        className="flex items-center gap-2 px-3 py-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        Tambah Staff
                      </button>
                      {report.assignments && report.assignments.length > 0 && (
                        <button
                          onClick={() => handleSendRevision(report)}
                          className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          Kirim Revisi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada laporan yang ditugaskan atau sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />}
      {addStaffReport && <AddStaffModal report={addStaffReport} onClose={() => setAddStaffReport(null)} />}
      {revisionReport && <RevisionModal report={revisionReport} onClose={() => setRevisionReport(null)} />}
    </div>
  )
}
