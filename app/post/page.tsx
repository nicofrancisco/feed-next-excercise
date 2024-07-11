'use client'

import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { TOTAL_POST_COUNT } from '../lib/types'
import { usePersistStore } from '../lib/features/persistStore'
import PostProvider from '../lib/features/post/PostStoreProvider'
import { usePostSelector, usePostStore } from '../lib/features/post/postHooks'
import { fetchPostById } from '../lib/features/post/postSlice'
import { isEmptyObject } from '../lib/utils/isEmptyObject'
import PostDetail from '../ui/post/postDetail/post-detail'
import ErrorMessage from '../ui/error-message'

const PostPage = () => {
  return (<PostProvider><PostComponent /></PostProvider>)
}

const PostComponent = () => {
  const store = usePostStore()
  const oldPost = usePostSelector((state) => state.post)
  const users = usePersistStore(state => state.users.entities)
  const newPosts = usePersistStore(state => state.newPosts)
  const initialized = useRef(false)
  const params = useSearchParams()
  const id = params.get('id')

  if (!id) {
    return (<ErrorMessage message={'No valid ID'} />)
  }
  if (!initialized.current && Number(id) <= TOTAL_POST_COUNT) {
    store.dispatch(fetchPostById(id))
    initialized.current = true
  }

  const post = newPosts.entities[Number(id)] || oldPost

  return post && !isEmptyObject(post) && (
    <main className='py-4 pt-12 px-5 overflow-y-auto h-[85vh]'>
      <PostDetail post={post} user={users[post.userId]} />
    </main>
  )
}

export default PostPage