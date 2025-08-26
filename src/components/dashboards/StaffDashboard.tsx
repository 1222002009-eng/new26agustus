"use client"

import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { CheckSquare, Clock, Send } from "lucide-react"

export function StaffDashboard() {
  const { state, dispatch } = useApp()
  const [selectedTask, setSelectedTask] = useState(null)

  const assignedReports = state.reports.filter((report) =>
    report.assignments?.some((assignment) => assignment.staffName === state.currentUser?.name),
  )

  const handleViewTask = (report) => {
    setSelectedTask(report)
  }

  const handleToggleTask = (taskIndex) => {
    if (!selectedTask) return

    const currentUserAssignment = selectedTask.assignments?.find(
      (assignment) => assignment.staffName === state.currentUser?.name,
    )

    if (!currentUserAssignment) return

    const task = currentUserAssignment.todoList[taskIndex]

    const updatedAssignments = selectedTask.assignments.map((assignment) => {
      if (assignment.staffName === state.currentUser?.name) {
        let updatedCompletedTasks
        if (assignment.completedTasks.includes(task)) {
          updatedCompletedTasks = assignment.completedTasks.filter((t) => t !== task)
        } else {
          updatedCompletedTasks = [...assignment.completedTasks, task]
        }

        const progress = Math.round((updatedCompletedTasks.length / assignment.todoList.length) * 100)

        return {
          ...assignment,
          completedTasks: updatedCompletedTasks,
          progress,
          status: progress === 100 ? "completed" : "in-progress",
        }
      }
      return assignment
    })

    const totalProgress = updatedAssignments.reduce((sum, assignment) => sum + assignment.progress, 0)
    const overallProgress = Math.round(totalProgress / updatedAssignments.length)

    const updatedReport = {
      ...selectedTask,
      assignments: updatedAssignments,
      progress: overallProgress,
    }

    dispatch({ type: "UPDATE_REPORT", payload: updatedReport })
    setSelectedTask(updatedReport)
  }

  const handleSubmitWork = () => {
    if (!selectedTask) return

    const updatedWorkflow = [
      ...selectedTask.workflow,
      {
        id: `w${Date.now()}`,
        action: `Diselesaikan oleh ${state.currentUser?.name}`,
        user: state.currentUser?.name || "",
        timestamp: new Date().toISOString(),
        status: "completed",
      },
      {
        id: `w${Date.now() + 1}`,
        action: "Dalam Evaluasi Koordinator",
        user: selectedTask.currentHolder || "",
        timestamp: new Date().toISOString(),
        status: "in-progress",
      },
    ]

    const updatedReport = {
      ...selectedTask,
      workflow: updatedWorkflow,
    }

    dispatch({ type: "UPDATE_REPORT", payload: updatedReport })
    setSelectedTask(null)
    alert("Pekerjaan berhasil dikirim ke koordinator!")
  }

  const getTaskProgress = (report) => {
    const userAssignment = report.assignments?.find((assignment) => assignment.staffName === state.currentUser?.name)
    return userAssignment?.progress || 0
  }

  const getCurrentUserAssignment = (report) => {
    return report.assignments?.find((assignment) => assignment.staffName === state.currentUser?.name)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <CheckSquare className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Staff</h1>
        </div>
        <p className="text-gray-600">Selesaikan tugas yang diberikan koordinator</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tugas Saya</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {assignedReports.map((report) => (
              <div key={report.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{report.noSurat}</h3>
                  <span className="text-sm text-gray-500">{getTaskProgress(report)}% Selesai</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{report.hal}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getTaskProgress(report)}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewTask(report)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Kerjakan
                  </button>
                </div>
              </div>
            ))}
            {assignedReports.length === 0 && (
              <div className="p-6 text-center text-gray-500">Tidak ada tugas yang ditugaskan kepada Anda.</div>
            )}
          </div>
        </div>

        {selectedTask && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Detail Tugas</h2>
              <p className="text-sm text-gray-600">
                {selectedTask.noSurat} - {selectedTask.hal}
              </p>
            </div>

            <div className="p-6">
              {getCurrentUserAssignment(selectedTask)?.revisionNotes && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Catatan Revisi:</h4>
                  <p className="text-red-700 text-sm">{getCurrentUserAssignment(selectedTask)?.revisionNotes}</p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Daftar Tugas:</h4>
                <div className="space-y-2">
                  {getCurrentUserAssignment(selectedTask)?.todoList.map((task, index) => {
                    const isCompleted = getCurrentUserAssignment(selectedTask)?.completedTasks.includes(task)
                    return (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => handleToggleTask(index)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`${isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
                          {task}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {getCurrentUserAssignment(selectedTask)?.notes && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Catatan Koordinator:</h4>
                  <p className="text-gray-700 text-sm">{getCurrentUserAssignment(selectedTask)?.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getTaskProgress(selectedTask)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{getTaskProgress(selectedTask)}%</span>
                </div>

                {getTaskProgress(selectedTask) === 100 && (
                  <button
                    onClick={handleSubmitWork}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Kirim ke Koordinator
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
