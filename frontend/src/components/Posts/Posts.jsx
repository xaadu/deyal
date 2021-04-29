import axios from 'axios'
import { useState, useEffect } from 'react'
import Post from './Post/Post'
import './Posts.module.scss'

const Posts = () => {
    const [pageNo, setPageNo] = useState(2)
    const [posts, setPosts] = useState([])

    useEffect(() => {

        axios.get(
            `https://api.xstechisland.tk/deyal/v1/posts?page=${pageNo}`, {
            params: {
                page: pageNo
            }
        }
        ).then(res => {
            const post_list = res.data.data
            setPosts(post_list)
        }).catch(e => {
            console.log(e)
        })

    }, [])

    return (
        <div className="container py-5">
            {posts.map(post => <Post key={post['_id']} name={post.title} short_desc={post.short_desc} />)}
        </div>
    )
}

export default Posts
