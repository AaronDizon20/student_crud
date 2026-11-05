import { useState, useEffect, useMemo, useCallback } from 'react'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import SearchBar from './components/SearchBar'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import { studentService } from './services/studentService'

export default function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [alert, setAlert] = useState(null)

  // Show notification alert with auto-dismiss
  const showAlert = useCallback((type, message) => {
    setAlert({ type, message })
  }, [])

  // Clear notification alert
  const clearAlert = useCallback(() => {
    setAlert(null)
  }, [])

  // Auto-dismiss alert after 6 seconds
  useEffect(() => {
    if (!alert) return
    const timer = setTimeout(() => {
      setAlert(null)
    }, 6000)
    return () => clearTimeout(timer)
  }, [alert])

  // Fetch all students from backend
  const loadStudents = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await studentService.getAll()
      // Ensure data is array
      setStudents(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching students:', err)
      showAlert(
        'error',
        `Failed to fetch students from backend (${err.message}). Please verify the Spring Boot server is running on http://localhost:8080.`
      )
    } finally {
      setIsLoading(false)
    }
  }, [showAlert])

  useEffect(() => {
    loadStudents()
  }, [loadStudents])

  // Create or Update student handler
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (editingStudent) {
        // Update
        const updated = await studentService.update(editingStudent.id, formData)
        showAlert(
          'success',
          `Student "${updated.firstname} ${updated.lastname}" (ID #${updated.id}) updated successfully.`
        )
        setEditingStudent(null)
      } else {
        // Create
        const created = await studentService.create(formData)
        showAlert(
          'success',
          `Student "${created.firstname} ${created.lastname}" added successfully.`
        )
      }
      await loadStudents()
    } catch (err) {
      console.error('Save error:', err)
      showAlert('error', `Operation failed: ${err.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete student handler (called from inline confirmation)
  const handleDeleteStudent = async (id) => {
    setIsDeletingId(id)
    try {
      await studentService.delete(id)
      showAlert('success', `Student #${id} deleted successfully.`)
      // If we are currently editing the student that got deleted, cancel edit
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null)
      }
      await loadStudents()
    } catch (err) {
      console.error('Delete error:', err)
      showAlert('error', `Failed to delete student #${id}: ${err.message}`)
    } finally {
      setIsDeletingId(null)
    }
  }

  // Start editing a student
  const handleStartEdit = (student) => {
    setEditingStudent(student)
    // On mobile, scroll form into view smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudent(null)
  }

  // Filter students by query (case-insensitive search across all fields)
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students

    const q = searchQuery.toLowerCase().trim()
    return students.filter((s) => {
      const idMatch = String(s.id).includes(q)
      const firstNameMatch = (s.firstname || '').toLowerCase().includes(q)
      const lastNameMatch = (s.lastname || '').toLowerCase().includes(q)
      const fullNameMatch = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase().includes(q)
      const courseMatch = (s.course || '').toLowerCase().includes(q)
      const sectionMatch = (s.section || '').toLowerCase().includes(q)
      return idMatch || firstNameMatch || lastNameMatch || fullNameMatch || courseMatch || sectionMatch
    })
  }, [students, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        studentCount={students.length}
        onRefresh={loadStudents}
        isLoading={isLoading}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Alerts / Feedback */}
        {alert && (
          <div className="mb-6">
            <Alert alert={alert} onClose={clearAlert} />
          </div>
        )}

        {/* Responsive Two-Column Layout (NO MODAL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Persistent Form Panel (Sticky on Desktop) */}
          <section className="lg:col-span-4 w-full">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </section>

          {/* Right Column: Student Directory & Search */}
          <section className="lg:col-span-8 w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="text-xs text-slate-500 font-medium px-1 sm:text-right">
                Showing{' '}
                <span className="font-bold text-slate-700">
                  {filteredStudents.length}
                </span>{' '}
                of {students.length} students
              </div>
            </div>

            {/* Student Table with Inline Confirmation for Deletion */}
            <StudentTable
              students={filteredStudents}
              isLoading={isLoading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={handleStartEdit}
              onDelete={handleDeleteStudent}
              isDeletingId={isDeletingId}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD Application &bull; Vite + React + Tailwind CSS &bull; REST API at <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">/dizon/students</code>
      </footer>
    </div>
  )
}
