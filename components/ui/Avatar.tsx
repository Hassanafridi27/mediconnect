const BG=['bg-slate-800','bg-teal-600','bg-purple-600','bg-amber-600','bg-rose-600','bg-blue-600']
export function Avatar({initials,size='md',index=0}:{initials:string;size?:'sm'|'md'|'lg';index?:number}){
  const sz={sm:'w-8 h-8 text-xs',md:'w-11 h-11 text-sm',lg:'w-14 h-14 text-base'}
  return <div className={`${sz[size]} ${BG[index%BG.length]} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>{initials}</div>
}
