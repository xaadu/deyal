import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import PostCreate from '../PostCreate/PostCreate'
import Loading from './Loading'
import Post from './Post'

const Posts = () => {
    const [pageNo, setPageNo] = useState(1)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState(false)

    const observer = useRef()

    const lastPostObserverRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNo(prevPageNo => prevPageNo + 1)
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
            let newPosts = res.data.data
            setPosts(oldPosts => {
                return [...oldPosts, ...newPosts]
            })
            const metadata = res.data.metadata
            setHasMore(metadata.post_returned + metadata.started_from < metadata.total_post)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setError(true)
        })

    }, [pageNo])

    return (
        <div className="posts">
            <PostCreate setPosts={setPosts} />
            {posts.map((post, i) => {
                //console.log(post)
                if (posts.length === i + 1)
                    return <Post ref={lastPostObserverRef}
                        key={post['_id']}
                        name={post.title}
                        description={post.description}
                        date={post.date}
                        time={post.time}
                    />
                return <Post
                    key={post['_id']}
                    name={post.name}
                    description={post.description}
                    date={post.date}
                    time={post.time}
                />
            })}
            { loading && <Loading />}
            { error && 'Error Loading Data'}
        </div>
    )
}

export default Posts
