import React from 'react'
import style from './Post.module.scss'

const Post = ({ name, short_desc }) => {
    return (
        <div className='my-5'>
            <div className={`card ${style.card}`}>
                <h2>{name}</h2>
                <p>{short_desc}</p>
            </div>
        </div>
    )
}

export default Post
