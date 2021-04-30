import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import Loading from './Loading/Loading'
import Post from './Post/Post'
import style from './Posts.module.scss'

const Posts = () => {
    const [pageNo, setPageNo] = useState(1)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState(false)

    const observer = useRef()

    const lastPostObserverRef = useCallback(node => {
        if (loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNo(prevPageNo => prevPageNo+1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        setLoading(true)
        setError(false)
        
        axios.get(
            `https://api.xstechisland.tk/deyal/v1/posts?page=${pageNo}`, {
            params: {
                page: pageNo
            }
        }
        ).then(res => {
            const newPosts = res.data.data
            setPosts(oldPosts => [...oldPosts, ...newPosts])
            const metadata = res.data.metadata
            console.log(metadata)
            setHasMore(metadata.post_returned + metadata.started_from < metadata.total_post)
            setLoading(false)
        }).catch(e => {
            setError(true)
        })

    }, [pageNo])

    return (
        <div className="container py-5">
            {posts.map((post, i) => {
                if (posts.length === i+1)
                    return <Post ref={lastPostObserverRef} 
                                key={post['_id']} 
                                name={post.title} 
                                short_desc={post.short_desc}
                            />
                return <Post key={post['_id']} name={post.title} short_desc={post.short_desc}/>
            })}
            { loading && <Loading /> }
            { error && 'Error Loading Data' }
        </div>
    )
}

export default Posts
