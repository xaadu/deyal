import React, { useEffect, useState } from 'react'

const Post = ({ name, description }, ref) => {

    const [expanded, setExpanded] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    const handleExpansion = e => {
        console.log(e)
        setExpanded(prevExpanded => !prevExpanded)
    }

    useEffect(() => {
        if (description && description.length > 400)
            setHasMore(true)
    }, [description])

    return (
        <div className='my-5' ref={ref}>
            <div className="card mx-auto">
                <div className="card__info px-4 py-2 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start">
                    <div className="left">
                        <i class="fal fa-user-secret"></i>
                    </div>
                    <div className="right px-4">
                        <div className="name text-center text-sm-start">
                            <h2>{name === '' ? 'Anonymous' : name}</h2>
                        </div>
                        <div className="datetime text-center text-sm-start">
                            <h4>May 12, 2021</h4>
                        </div>
                    </div>
                </div>
                <div className="card__details p-4">
                    {hasMore ? expanded ? description : description.slice(0, 240) + '... ' : description}
                    {expanded ? <br /> : ''}
                    {hasMore ? <button className="btn btn-expand" onClick={handleExpansion}> {expanded ? 'Show Less' : 'Show More'}</button> : ''}
                </div>
            </div>
        </div>
    )
}

export default React.forwardRef(Post)
