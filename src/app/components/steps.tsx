export function Steps() {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="relative">
        <div className="border-2 border-primary h-10 w-10 rounded-full"></div>
        <div className="absolute top-4 left-[15px] bg-primary h-2.5 w-2.5 rounded-full"></div>
      </div>
      <div className="bg-white h-1 w-[130px]"></div>
      <div className="bg-primary h-2.5 w-2.5 rounded-full"></div>
      <div className="bg-white h-1 w-[130px]"></div>
      <div className="bg-primary h-2.5 w-2.5 rounded-full"></div>
    </div>
  )
}
