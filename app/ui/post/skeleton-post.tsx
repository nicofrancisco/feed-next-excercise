
const SkeletonPost = () => (
    <div className="flex space-x-4 animate-pulse mx-auto justify-center">
      <div className='min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3'>
        <div className="min-h-12 min-w-12 flex-none rounded-full bg-gray-200"></div>
        <div className='grow border-l-4 border-gray-300 min-h-5 w-0 mt-2'></div>
      </div>
      <div className='flex flex-col w-full xxl:w-auto pr-5 pl-5'>
        <div className='h-12 flex flex-col justify-center'>
          <span className='font-semibold text-xs bg-gray-200 h-4 w-28 block'></span>
          <time className='text-xs leading-5 text-gray-300 bg-gray-200 h-3 w-16 block'></time>
        </div>
        <div className="mt-2 line-clamp-3 max-h-32 bg-gray-200 h-16 w-full sm:w-auto xl:w-2/4"></div>
        <div className="mt-2 line-clamp-3 max-h-32 bg-gray-200 h-16 w-full sm:w-auto xl:w-2/4"></div>
      </div>
    </div>
  );
  
  export default SkeletonPost;

 