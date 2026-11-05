import { GraduationCap, Users, RefreshCw } from 'lucide-react'

export default function Navbar({ studentCount, onRefresh, isLoading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Manager</h1>
              <p className="text-xs text-slate-500 font-medium">CRUD Management Dashboard</p>
            </div>
          </div>

          {/* Right Action / Stats */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
              <Users className="w-4 h-4 mr-2 text-slate-500" />
              <span>Total Students:</span>
              <span className="ml-1.5 font-bold text-blue-600 bg-white px-2 py-0.5 rounded shadow-xs">
                {studentCount}
              </span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh Data"
              className="inline-flex items-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
