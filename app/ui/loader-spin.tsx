interface Params {
  text?: string
}

const LoaderSpin = (params: Params) => {
  const { text } = params

  return (
    <div className="flex flex-col gap-4 items-center">
      {text && (<span className='text-gray-900'>{text}</span>)}
      <div className="relative">
        <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-t-4 border-b-4 border-black-600 animate-spin"></div>
    </div>
    </div>
  )
}

export default LoaderSpin