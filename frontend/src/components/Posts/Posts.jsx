import axios from 'axios'
import { useState, useEffect } from 'react'
import Post from './Post/Post'
import './Posts.module.scss'

const Posts = () => {
    const [pageNo, setPageNo] = useState(1)
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

    }, [pageNo])

    return (
        <div className="container py-5">
            <div className="btn-group">
                <button className="btn btn-outline-primary" onClick={e => setPageNo(pageNo - 1)}>
                    Previous
                </button>
                <button className="btn btn-outline-primary" onClick={e => setPageNo(pageNo + 1)}>
                    Next
                </button>
            </div>

            {posts.map(post => <Post key={post['_id']} name={post.name} short_desc={post.short_desc} />)}
        </div>
    )
}

export default Posts
