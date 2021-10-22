import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<CreateBlogForm /> component', () => {
    test('create blog onSubmit', () => {
        const createBlog = jest.fn()
        /* const blog={
            title: 'some title',
            author: 'some author',
            url: 'some url'
        } */
        const component = render(<BlogForm createBlog={createBlog} />)
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('#blogform')
        fireEvent.change(title, {
            target: { value: 'Test Blog title' },
        })
        fireEvent.change(author, {
            target: { value: 'Tester' },
        })
        fireEvent.change(url, {
            target: { value: 'Test Blog Url' },
        })
        fireEvent.submit(form)
        expect(createBlog.mock.calls).toHaveLength(1)
        //console.log(createBlog.mock.calls[0][0]);
        expect(createBlog.mock.calls[0][0].title).toHaveTextContent(
            'Test Blog title'
        )
        expect(createBlog.mock.calls[0][0].author).toHaveTextContent('Tester')
        expect(createBlog.mock.calls[0][0].url).toHaveTextContent('Test Blog Url')
    })
})