import { useState, useEffect } from 'react'
import { UserPlus, UserCheck, XCircle, RotateCcw, AlertCircle } from 'lucide-react'

export default function StudentForm({
  editingStudent,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  })
  const [errors, setErrors] = useState({})

  // Update form when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      })
      setErrors({})
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      })
      setErrors({})
    }
  }, [editingStudent])

  const validate = () => {
    const newErrors = {}
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required'
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required'
    if (!formData.course.trim()) newErrors.course = 'Course is required'
    if (!formData.section.trim()) newErrors.section = 'Section is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    })
  }

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    })
    setErrors({})
  }

  const isEditing = Boolean(editingStudent)

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isEditing
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {isEditing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? `Edit Student #${editingStudent.id}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing ? 'Update student record information' : 'Fill in details to register student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
            Editing Mode
          </span>
        )}
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. John"
            className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${
              errors.firstname
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 mr-1 inline shrink-0" />
              {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Doe"
            className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${
              errors.lastname
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center">
              <AlertCircle className="w-3.5 h-3.5 mr-1 inline shrink-0" />
              {errors.lastname}
            </p>
          )}
        </div>

        {/* Grid for Course & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSCS, BSIT"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                errors.course
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 inline shrink-0" />
                {errors.course}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3-A, 4-B"
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                errors.section
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 inline shrink-0" />
                {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium text-sm text-white shadow-xs transition-all disabled:opacity-60 ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-500/20'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                {isEditing ? 'Updating...' : 'Saving...'}
              </span>
            ) : isEditing ? (
              'Update Student'
            ) : (
              'Save Student'
            )}
          </button>

          {isEditing ? (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-all"
            >
              <XCircle className="w-4 h-4 mr-1.5" />
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              title="Reset fields"
              className="inline-flex items-center justify-center px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
