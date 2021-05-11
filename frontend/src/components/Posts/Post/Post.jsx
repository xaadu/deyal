import React, { useEffect, useState } from 'react'
import style from './Post.module.scss'

const Post = ({ name, description }, ref) => {

    const [expanded, setExpanded] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    const handleExpansion = e => {
        console.log(e)
        setExpanded(prevExpanded => !prevExpanded)
    }

    useEffect(() => {
        if (description.length > 4)
            setHasMore(true)
    }, [description])

    return (
        <div className='my-5' ref={ref}>
            <div className={`card ${style.card}`}>
                <h2>{name === '' ? 'Anonymous' : name}</h2>
                <p>
                    {hasMore ? expanded ? description : description.slice(0, 3) + '... ' : description}
                    {hasMore ? expanded ? <button onClick={handleExpansion}>Show Less</button> : <button onClick={handleExpansion}>Show More</button> : ''}
                </p>
            </div>
        </div>
    )
}

export default React.forwardRef(Post)
