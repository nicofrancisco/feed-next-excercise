/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Post, User } from '../../../lib/types'
import { getTimeStamp } from '../../../lib/utils/getTimeStamp'
import { isNewPost } from '../../../lib/utils/isNewPost'

interface Params {
  post: Post
  user: User | null
}

const PostPreview = (params: Params) => {
  const { post, user } = params

  return (
    <div data-testid="post-preview">
      {user ? (
        <Link href={`/post?id=${post.id}`}
              key={post.id}
              className={`${isNewPost(post) ? 'animate-fadeInUp' : ('')} px-5 py-2 flex justify-between hover:bg-gray-100 sm:px-7`}
              aria-label={`Read post: "${post.title}" by ${user.name}`}
        >
          <article className={`${isNewPost(post) ? 'animate-scale' : ('')} flex space-x-4`}>
          <div className={`${isNewPost(post) ? 'animate-background-pulse' : ('')} flex space-x-4`}>
            <div className="min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3">
              <img
                alt='user-avatar'
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`} 
                className="min-h-14 min-w-14 flex-none rounded-full bg-gray-50"
                loading="lazy"
              />
              <div className='grow border-l-4 border-slate-200 min-h-5 w-0 mt-2'></div>
            </div>
            <div className='flex flex-col'>
              <div className='h-16 flex flex-col justify-center'>
                <span className='font-bold text-lg'>{user.name}</span>
                <time className='text-xs leading-5 text-gray-500'>{getTimeStamp(post['created'])}</time>
              </div>
              <h2 className='text-md font-semibold leading-6 text-gray-700 capitalize'>{post.title}</h2>
              <p className="mt-2 line-clamp-3 max-h-32 text-wrap overflow-y-hidden text-ellipsis overflow-hidden text-sm leading-6 text-gray-800">{post.body.slice(0, 130)}{post.body.length > 130 ? '...' : ''}</p>
            </div>
            </div>
          </article>
        </Link>
          ) : (
          <div className="block p-4 mb-4 border rounded-lg bg-red-100 text-red-600">
            Sorry, no author information available
         </div>
      )}
    </div>
  )
}

export default PostPreview
