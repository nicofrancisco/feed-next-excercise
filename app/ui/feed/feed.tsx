import { useEffect, useRef, useState } from 'react'
import { Post, User } from '../../lib/types'
import { useInfiniteScroll } from '../../lib/hooks/useInfiniteScroll'
import useScrollPosition from '../../lib/hooks/useScrollPosition'
import PostPreview from '../post/postPreview/post-preview'
import LoaderSpin from '../loader-spin'

interface Params {
  displayedPostIds: number[]
  posts: Record<number, Post>
  newPosts: {
    ids: number[]
    entities: Record<number, Post>
  }
  users: Record<number, User>
  scrollPosition: number
  onScroll: (position: number) => void
  fetchMorePost: () => void
}

const Feed = (params: Params) => {
  const { displayedPostIds, posts, newPosts, users, scrollPosition, onScroll, fetchMorePost } = params

  const [newPostReceived, setNewPostReceived] = useState(false)
  const previousNewPostIds = useRef(newPosts.ids)
  const infiniteScrollRef = useRef<HTMLDivElement | null>(null)
  const { fetchMore } = useInfiniteScroll(infiniteScrollRef.current, displayedPostIds.length > 0)
  const scrollPositionRef = useScrollPosition<HTMLUListElement>(scrollPosition)

  const morePostsAvailable = displayedPostIds.length < Object.keys(posts).length

  useEffect(() => {
    if (newPosts.ids.length > previousNewPostIds.current.length) {
      setNewPostReceived(true)
    }

    const timeout = setTimeout(() => {
      setNewPostReceived(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [newPosts.ids, previousNewPostIds, setNewPostReceived])

  useEffect(() => {
    let timer:any = null
    if (fetchMore) {

      timer = setTimeout(() => {
        fetchMorePost();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [fetchMore, fetchMorePost])

  return (
    <div className='grid grid-rows-12 h-screen animate-fadeInUp flex-col'>
      {newPostReceived && (
        <div className="fixed left-1/2 top-14 transform -translate-x-1/2 z-50 rounded bg-gray-800 p-2 m-1 text-white text-center text-sm">New Post received</div>
      )}
      <ul ref={scrollPositionRef} onScroll={(e) => onScroll(e.currentTarget.scrollTop)} role="list" className="py-5 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {newPosts.ids.map((id) => (<PostPreview key={id} post={newPosts.entities[id]} user={users[newPosts.entities[id].userId]} />))}
        {displayedPostIds.map((id) => (<PostPreview key={id} post={posts[id]} user={users[posts[id].userId]} />))}

        <div ref={infiniteScrollRef} className='flex justify-center mt-2'>
          {morePostsAvailable && (<span className='text-xs text-gray-600'><LoaderSpin></LoaderSpin></span>)}
        </div>
      </ul>
    </div>
  )
}

export default Feed