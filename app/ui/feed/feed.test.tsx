// components/__tests__/Feed.test.tsx


import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { vi, expect } from 'vitest'
import Feed from './feed'
import { Post, User } from '../../lib/types'
import configureMockStore from 'redux-mock-store'
import { debug } from 'console'

const mockStore = configureMockStore()
/*vi.mock('redux-mock-store', () => {
  const actual = vi.importActual('redux-mock-store')
  return {
    ...actual,
    default: () => {
      const mockStore = (state: any) => ({
        getState: () => state,
        subscribe: vi.fn(),
        dispatch: vi.fn(),
        clearActions: vi.fn(), // Add clearActions if needed
        getActions: vi.fn(() => []), // Add getActions if needed
      })
      return mockStore
    },
  }
})
const mockStore = require('redux-mock-store').default*/

const mockPosts: Record<number, Post> = {
  1: { id: 1, title: 'Test Post 1', body: 'This is the body of test post 1', userId: 1 },
  2: { id: 2, title: 'Test Post 2', body: 'This is the body of test post 2', userId: 2 },
}
const mockUsers: Record<number, User> = {
  1: { 
    id: 1, 
    name: 'Test User 1', 
    username: 'testuser1', 
    email: 'test1@example.com', 
    phone: '123-456-9990', 
    website: 'www.user1.com',
    address: { street: '123 Test St', city: 'Test', zipcode: '12345', suite:'', geo:{
      lat: '',
      lng: ''}
    }, 
    company: { name: 'Test Company 1', catchPhrase: 'Test 1', bs: 'Test as 1' } // Add company
  },
  2: { 
    id: 2, 
    name: 'Test User 2', 
    username: 'testuser2', 
    email: 'test2@example.com', 
    phone: '123-456-9991', 
    website: 'www.user2.com',
    address: { street: '123 Test St', city: 'Test', zipcode: '12345', suite:'', geo:{
      lat: '',
      lng: ''}
    },
    company: { name: 'Test Company 2', catchPhrase: 'Test 2', bs: 'Test as 2' } // Add company
  },
}

const mockParams = {
  displayedPostIds: [1, 2],
  posts: mockPosts,
  newPosts: {
    ids: [1, 2],
    entities: mockPosts,
  },
  users: mockUsers,
  scrollPosition: 0,
  onScroll: vi.fn(),
  fetchMorePost: vi.fn(),
}

describe('Feed Component', () => {
  it('renders correctly', () => {
    const initialState = {
      // Add your initial state here if needed
    }
    const store = mockStore(initialState)

    const { asFragment } = render(
      <Provider store={store}>
        <Feed {...mockParams} />
      </Provider>
    )

    debug()

    // Check if the user names are present
    expect(screen.queryAllByText('Test User 1')).toBeTruthy()
    expect(screen.queryAllByText('Test User 2')).toBeTruthy()

    // Check if the post titles are present
    expect(screen.queryAllByText('Test Post 1')).toBeTruthy()
    expect(screen.queryAllByText('Test Post 2')).toBeTruthy()

    // Snapshot test for the entire component
    expect(asFragment()).toMatchSnapshot()
  })
})

/*import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Feed from './feed';
import { vi, expect } from 'vitest'

vi.mock('redux-mock-store', () => {
  const actual = vi.importActual('redux-mock-store')
  return {
    ...actual,
    default: () => {
      const mockStore = (state:any) => ({
        getState: () => state,
        subscribe: vi.fn(),
        dispatch: vi.fn(),
      })
      return mockStore
    },
  }
})
const mockStore = require('redux-mock-store').default

describe('Feed Component', () => {
  it('renders correctly', () => {
    const initialState = {
      posts: {
        items: [
          { id: 1, title: 'Test Post', body: 'This is a test post', user: { name: 'Test User' } },
        ],
        status: 'succeeded',
      },
    };
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <Feed displayedPostIds={[]} posts={[]} newPosts={[]} users={[]} />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
})*/

class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

global.IntersectionObserver = IntersectionObserver