import { CheckCircle2, AlertCircle, X } from 'lucide-react'

export default function Alert({ alert, onClose }) {
  if (!alert) return null

  const isSuccess = alert.type === 'success'

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-200 flex items-start justify-between shadow-xs ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
    >
      <div className="flex items-start space-x-3">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
        )}
        <div>
          <p className="text-sm font-semibold">{isSuccess ? 'Success' : 'Error'}</p>
          <p className="text-sm opacity-90 mt-0.5">{alert.message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`p-1 rounded-lg transition-colors ml-4 ${
          isSuccess
            ? 'hover:bg-emerald-100 text-emerald-700'
            : 'hover:bg-rose-100 text-rose-700'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
