"use client"

import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { FileText, Plus, Edit, Trash2, Send } from "lucide-react"
import { ReportForm } from "../forms/ReportForm"
import { ForwardForm } from "../forms/ForwardForm"

export function TUDashboard() {
  const { state, dispatch } = useApp()
  const [showReportForm, setShowReportForm] = useState(false)
  const [showForwardForm, setShowForwardForm] = useState(false)
  const [editingReport, setEditingReport] = useState(null)
  const [forwardingReport, setForwardingReport] = useState(null)

  const userReports = state.reports.filter((report) => report.createdBy === state.currentUser?.id)

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800"
      case "Dalam Proses":
        return "bg-yellow-100 text-yellow-800"
      case "Revisi":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddReport = () => {
    setEditingReport(null)
    setShowReportForm(true)
  }

  const handleEditReport = (report) => {
    setEditingReport(report)
    setShowReportForm(true)
  }

  const handleDeleteReport = (reportId) => {
    if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      dispatch({ type: "DELETE_REPORT", payload: reportId })
    }
  }

  const handleForwardReport = (report) => {
    setForwardingReport(report)
    setShowForwardForm(true)
  }

  const handleReportSubmit = (reportData) => {
    const newReport = {
      ...reportData,
      id: editingReport?.id || `RPT${Date.now()}`,
      createdBy: state.currentUser?.id || "",
      assignments: editingReport?.assignments || [],
      assignedStaff: editingReport?.assignedStaff || [],
      assignedCoordinators: editingReport?.assignedCoordinators || [],
      currentHolder: editingReport?.currentHolder || "",
      progress: editingReport?.progress || 0,
      workflow: editingReport?.workflow || [
        {
          id: `w${Date.now()}`,
          action: `Dibuat oleh ${state.currentUser?.name}`,
          user: state.currentUser?.name || "",
          timestamp: new Date().toISOString(),
          status: "completed",
        },
      ],
    }

    if (editingReport) {
      dispatch({ type: "UPDATE_REPORT", payload: newReport })
    } else {
      dispatch({ type: "ADD_REPORT", payload: newReport })
    }
    setShowReportForm(false)
    setEditingReport(null)
  }

  const handleForwardSubmit = (forwardData) => {
    const updatedReport = {
      ...forwardingReport,
      assignedCoordinators: forwardData.coordinators,
      currentHolder: forwardData.coordinators[0],
      status: "Dalam Proses",
      workflow: [
        ...forwardingReport.workflow,
        {
          id: `w${Date.now()}`,
          action: "Diteruskan ke Koordinator",
          user: state.currentUser?.name || "",
          timestamp: new Date().toISOString(),
          status: "completed",
        },
        {
          id: `w${Date.now() + 1}`,
          action: "Dalam Verifikasi Dokumen",
          user: forwardData.coordinators[0],
          timestamp: new Date().toISOString(),
          status: "in-progress",
        },
      ],
    }

    dispatch({ type: "UPDATE_REPORT", payload: updatedReport })
    setShowForwardForm(false)
    setForwardingReport(null)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Dashboard TU</h1>
        </div>
        <p className="text-gray-600">Kelola laporan dan teruskan ke koordinator yang tepat</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Daftar Laporan</h2>
            <button
              onClick={handleAddReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Buat Laporan
            </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.noSurat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.hal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{report.layanan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditReport(report)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleForwardReport(report)}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Teruskan"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {userReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Belum ada laporan. Klik "Buat Laporan" untuk membuat laporan baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showReportForm && (
        <ReportForm
          report={editingReport}
          onSubmit={handleReportSubmit}
          onCancel={() => {
            setShowReportForm(false)
            setEditingReport(null)
          }}
        />
      )}

      {showForwardForm && (
        <ForwardForm
          report={forwardingReport}
          onSubmit={handleForwardSubmit}
          onCancel={() => {
            setShowForwardForm(false)
            setForwardingReport(null)
          }}
        />
      )}
    </div>
  )
}
