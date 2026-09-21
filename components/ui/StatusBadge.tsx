export function StatusBadge({status}:{status:'upcoming'|'completed'|'cancelled'}){
  const map={upcoming:'bg-teal-50 text-teal-700 border border-teal-200',completed:'bg-gray-100 text-gray-600 border border-gray-200',cancelled:'bg-red-50 text-red-600 border border-red-200'}
  const dot={upcoming:'bg-teal-500',completed:'bg-gray-400',cancelled:'bg-red-500'}
  return <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}><span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`}/>{status.charAt(0).toUpperCase()+status.slice(1)}</span>
}
