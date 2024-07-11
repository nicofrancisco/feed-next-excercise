'use client'

import { useEffect, useRef, useState } from 'react'
import { User } from '../types'
import { usePersistStore } from './persistStore'
import { isEmptyObject } from '../utils/isEmptyObject'
import SkeletonPost from '@/app/ui/post/skeleton-post'

const PersistStoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const initialized = useRef(false)
  const setUsers = usePersistStore(state => state.setUsers)
  const users = usePersistStore(state => state.users.entities)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData()
        if (data instanceof Error) {
          throw data
        }
        setUsers(data)
      } catch (error) {
        console.error('Users fetching error', error)
      }
    }

    if (!initialized.current) {
      fetchDataAsync()
      initialized.current = true
    }
  }, [setUsers])

  if (isEmptyObject(users)) {
    return (
      <div className='flex justify-center animate-pulse flex flex-col pl-5 mb-5'>
        {Array(10).fill(0).map((_, index) => (
          <div key={index} className={index === 0 ? 'mt-20' : ''}>
            <SkeletonPost />
          </div>
        ))}
      </div>
    )
  }
  return <div>{children}</div>
}

export default PersistStoreProvider

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchData = async (): Promise<User[] | Error> => {
  const response = await fetch(API_URL)

  if (response.ok) {
    return response.json() satisfies Promise<User[]>
  }

  return new Error('Failed to fetch users')
}