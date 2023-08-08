interface IStepProps {
  step: 'step-1' | 'step-2' | 'step-3'
}

export function Steps({ step }: IStepProps) {
  console.log(step)
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <div className="relative">
        <div
          className={
            step === 'step-1'
              ? 'border-1 border-primary h-8 w-8 rounded-full flex flex-row justify-center items-center'
              : 'bg-primary h-2 w-2 rounded-full'
          }
        >
          <div className="bg-primary h-2 w-2 rounded-full"></div>
        </div>
      </div>
      <div
        className={
          step !== 'step-1'
            ? 'bg-primary h-1 w-[80px] rounded-md'
            : 'bg-white h-1 w-[80px] rounded-md'
        }
      ></div>
      <div className="relative">
        <div
          className={
            step === 'step-2'
              ? 'border-1 border-primary h-8 w-8 rounded-full flex flex-row justify-center items-center'
              : 'bg-primary h-2 w-2 rounded-full'
          }
        >
          <div className="bg-primary h-2 w-2 rounded-full"></div>
        </div>
      </div>
      <div
        className={
          step === 'step-3'
            ? 'bg-primary h-1 w-[80px] rounded-md'
            : 'bg-white h-1 w-[80px] rounded-md'
        }
      ></div>
      <div className="relative">
        <div
          className={
            step === 'step-3'
              ? 'border-1 border-primary h-8 w-8 rounded-full flex flex-row justify-center items-center'
              : 'bg-primary h-2 w-2 rounded-full'
          }
        >
          <div className="bg-primary h-2 w-2 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
