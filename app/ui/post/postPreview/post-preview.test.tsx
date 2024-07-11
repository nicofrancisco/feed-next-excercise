import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import PostPreview from "./post-preview";
import { Post, User } from "../../../lib/types";
import { expect } from 'vitest';


const mockPost: Post = {
  id: 1,
  title: "Test Post",
  body: "This is a Post Preview test",
  userId: 0,
};

const mockAuthor: User = {
  id: 1,
  name: "John Doe",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

describe("PostPreview Component", () => {
  it("should render with author information", () => {
    render(
      <PostPreview post={mockPost} user={mockAuthor} />
    );
    expect(screen.getByText(mockAuthor.name)).toBeTruthy();
    expect(screen.getByText(mockPost.title)).toBeTruthy();
    expect(screen.queryByText(new RegExp(mockPost.body))).toBeTruthy();
  });

  it("should render without author information", () => {
    render(<PostPreview post={mockPost} user={null} />);
    expect(
      screen.getByText(/Sorry, no author information available/i)
    ).toBeTruthy();
  });

  it("should render correctly with given props and create snapshot", () => {
    const { asFragment } = render(
      <PostPreview post={mockPost} user={mockAuthor} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
