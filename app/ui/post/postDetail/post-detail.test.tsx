import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from 'vitest';
import PostDetail from './post-detail'
import { Post, User } from '../../../lib/types'

const mockPost: Post = {
  id: 1,
  userId:1,
  title: 'Test Post Title',
  body: 'This is the body of the test post.'
}

const mockUser: User = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'testuser@example.com',
  address: {
    street: '123 Test St',
    suite: 'Apt 1',
    city: 'Test City',
    zipcode: '12345',
    geo: {
      lat: '0.0000',
      lng: '0.0000'
    }
  },
  company: {
    name: 'Test Company',
    catchPhrase: 'Test Catchphrase',
    bs: 'Test BS'
  },
  phone: '123-456-7890',
  website: 'www.testuser.com'
}

describe('PostDetail', () => {
    it('renders correctly', () => {
        const { asFragment } = render(<PostDetail post={mockPost} user={mockUser} />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders the user name', () => {
        render(<PostDetail post={mockPost} user={mockUser} />)
        expect(screen.getByText('Test User')).toBeInTheDocument()
    })
    
    it('renders the post title', () => {
        render(<PostDetail post={mockPost} user={mockUser} />)
        expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    })
    
    it('renders the user image', () => {
        render(<PostDetail post={mockPost} user={mockUser} />)
        const userImage = screen.getByAltText('user-avatar')
        expect(userImage).toBeInTheDocument()
        expect(userImage).toHaveAttribute('src')
    })
})