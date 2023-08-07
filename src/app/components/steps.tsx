export function Steps() {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="relative">
        <div className="border-1 border-primary h-8 w-8 rounded-full flex flex-row justify-center items-center">
          <div className="bg-primary h-2 w-2 rounded-full"></div>
        </div>
      </div>
      <div className="bg-white h-1 w-[80px] rounded-md"></div>
      <div className="bg-primary h-2 w-2 rounded-full"></div>
      <div className="bg-white h-1 w-[80px] rounded-md "></div>
      <div className="bg-primary h-2 w-2 rounded-full"></div>
    </div>
  )
}
