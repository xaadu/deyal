import { useRef, useCallback } from 'react'

const Post = ({ children }) => {

    const observer = useRef()
    const postObserverRef = useCallback(node => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const classList = entries[0].target.classList
                classList.add('blurred')
                classList.add('animate__fadeInUp')
            } else {
                const classList = entries[0].target.classList
                classList.remove('blurred')
            }
        })
        if (node) observer.current.observe(node)
    }, [])


    return (
        <div className="card animate__animated animate__fast mx-auto" ref={postObserverRef}>
            {children}
        </div>
    )
}

export default Post
