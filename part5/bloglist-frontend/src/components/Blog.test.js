import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component', () => {
    let component
    const mockHandlerUpdate = jest.fn()

    beforeEach(() => {
        const user = {
            name: 'Test User',
            username: 'testUsername',
        }

        const blog = {
            title: 'Blog Title',
            author: 'author',
            url: 'url',
            likes: 5,
        }

        component = render(
            <Blog blog={blog} user={user} updateBlog={mockHandlerUpdate} />
        )
    })

    test('renders without errors', () => {
        expect(component).toBeDefined()
    })

    test('shows the blog title, but not the other details', () => {
        const title = component.container.querySelector('.blog-title')
        expect(title).toBeDefined()
        const details = component.container.querySelector('.blog-details')
        expect(details).toBe(null)
    })

    test('show the blog-details when the show button is clicked', () => {
        let button = component.getByText('show')
        fireEvent.click(button)

        button = component.getByText('hide')
        expect(button).toBeDefined()

        const details = component.container.querySelector('.blog-details')
        expect(details).toBeDefined()
    })

    test('like twice check', () => {
        let viewButton = component.getByText('show')
        fireEvent.click(viewButton)

        let likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
    })
})
