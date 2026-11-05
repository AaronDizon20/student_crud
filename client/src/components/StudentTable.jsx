import { useState } from 'react'
import { Edit2, Trash2, Check, X, AlertTriangle, User } from 'lucide-react'

export default function StudentTable({
  students,
  isLoading,
  editingStudentId,
  onEdit,
  onDelete,
  isDeletingId,
}) {
  // Track which student row has the inline confirmation active (NO MODAL)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const handleStartDelete = (id) => {
    setConfirmDeleteId(id)
  }

  const handleCancelDelete = () => {
    setConfirmDeleteId(null)
  }

  const handleConfirmDelete = (id) => {
    onDelete(id)
    setConfirmDeleteId(null)
  }

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-6 shadow-xs">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-xl w-full"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!students || students.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No students found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          No records match your criteria. Add a new student using the form or clear your search filters.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 sm:px-6">ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Course</th>
              <th className="py-3.5 px-4">Section</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isCurrentlyEditing = editingStudentId === student.id
              const isConfirmingDelete = confirmDeleteId === student.id
              const isDeletingThis = isDeletingId === student.id

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isCurrentlyEditing
                      ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                      : isConfirmingDelete
                      ? 'bg-rose-50/40'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-500 font-semibold">
                    #{student.id}
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {student.firstname ? student.firstname.charAt(0) : ''}
                        {student.lastname ? student.lastname.charAt(0) : ''}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">
                          {student.firstname} {student.lastname}
                        </p>
                        {isCurrentlyEditing && (
                          <span className="text-[11px] font-medium text-amber-600">
                            Currently editing
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {student.section}
                    </span>
                  </td>

                  {/* Actions (NO MODAL - Inline Confirmation) */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    {isConfirmingDelete ? (
                      // Inline Delete Confirmation
                      <div className="inline-flex items-center space-x-1.5 bg-white border border-rose-200 p-1 rounded-xl shadow-xs">
                        <span className="text-xs font-medium text-rose-700 px-1 flex items-center">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-500" />
                          Delete?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(student.id)}
                          disabled={isDeletingThis}
                          className="inline-flex items-center px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                          title="Confirm Delete"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelDelete}
                          disabled={isDeletingThis}
                          className="inline-flex items-center px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors"
                          title="Cancel Delete"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      // Standard Edit & Delete Action Buttons
                      <div className="inline-flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => onEdit(student)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isCurrentlyEditing
                              ? 'bg-amber-100 text-amber-800'
                              : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartDelete(student.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
