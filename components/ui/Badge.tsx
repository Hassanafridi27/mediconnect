import clsx from 'clsx'
type BadgeProps={children:React.ReactNode;variant?:'teal'|'blue'|'green'|'red'|'gray';className?:string}
export function Badge({children,variant='teal',className}:BadgeProps){
  return <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',{'bg-teal-100 text-teal-800':variant==='teal','bg-blue-100 text-blue-800':variant==='blue','bg-green-100 text-green-800':variant==='green','bg-red-100 text-red-800':variant==='red','bg-gray-100 text-gray-700':variant==='gray'},className)}>{children}</span>
}
