'use client'

import { socket } from '@/socket'
import { useRef } from 'react'
import FeedProvider from '../lib/features/feed/FeedStoreProvider'
import { useFeedSelector, useFeedStore } from '../lib/features/feed/feedHooks'
import { fetchPosts } from '../lib/features/feed/feedSlice'
import { usePersistStore } from '../lib/features/persistStore'
import Feed from '../ui/feed/feed'
import { PAGE_SIZE } from '../lib/types'
import useMockRealTimeUpdates from '../lib/hooks/useMockRealTimeUpdates'

const FeedPage = () => (<FeedProvider><FeedComponent /></FeedProvider>)

const FeedComponent = () => {
  const feedStore = useFeedStore()

  const feedInitialized = useRef(false)
  if (!feedInitialized.current) {
    feedStore.dispatch(fetchPosts())
    feedInitialized.current = true
  }

  const socketInitialized = useRef(false)
  if (!socketInitialized.current) {
    socket.on("newPostAdded", (post) => {
      addNewPost(post)
    })
    socketInitialized.current = true
  }

  const postIds = useFeedSelector((state) => state.ids)
  const posts = useFeedSelector((state) => state.entities)

  const users = usePersistStore(state => state.users.entities)
  const newPosts = usePersistStore(state => state.newPosts)
  const addNewPost = usePersistStore(state => state.addNewPost)
  const setScrollPosition = usePersistStore(state => state.setScrollPosition)
  const scrollPosition = usePersistStore(state => state.scrollPosition)
  const setPage = usePersistStore(state => state.setPage)
  const page = usePersistStore(state => state.page)
  const mockRealTimeUpdates = useMockRealTimeUpdates(socket)

  const displayPostIds = postIds.slice(0, page * PAGE_SIZE)

  const onScrollHandler = (position: number) => {
    setScrollPosition(position)
  }

  const fetchMorePost = () => {
    setPage(page + 1)
  }

  return (
    <main className='feed-page'>
      <Feed 
        displayedPostIds={displayPostIds}
        posts={posts} newPosts={newPosts}
        users={users} onScroll={onScrollHandler}
        fetchMorePost={fetchMorePost}
        scrollPosition={scrollPosition}
       />
    </main>
  )
}

export default FeedPage