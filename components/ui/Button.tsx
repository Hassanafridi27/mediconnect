import clsx from 'clsx'
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}
export function Button({ children, variant = 'primary', size = 'md', isLoading, className, disabled, ...props }: ButtonProps) {
  return (
    <button disabled={disabled || isLoading} className={clsx('inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed',{ 'bg-teal-600 text-white hover:bg-teal-700':variant==='primary','bg-white text-gray-700 border border-gray-200 hover:bg-gray-50':variant==='secondary','text-gray-600 hover:bg-gray-100':variant==='ghost','bg-red-600 text-white hover:bg-red-700':variant==='danger','text-xs px-3 py-1.5':size==='sm','text-sm px-4 py-2':size==='md','text-base px-6 py-3':size==='lg'},className)} {...props}>
      {isLoading&&<span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>}
      {children}
    </button>
  )
}
