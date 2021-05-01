import axios from 'axios'
import { useState, useRef } from 'react'

import styles from './Modal.module.scss'

const Modal = ({ setPosts }) => {

    const [name, setName] = useState('')
    const [post, setPost] = useState('')

    const modal = useRef()
    const cancel = useRef()

    const handleForm = e => {
        e.preventDefault()

        let description, short_desc

        if (post.length > 100) {
            description = post
            short_desc = post.slice(0, 50) + '...'
        } else {
            short_desc = post
            description = ''
        }

        axios({
            method: 'POST',
            url: `https://api.xstechisland.tk/deyal/v1/posts`,
            data: {
                name: name,
                description: description,
                short_desc: short_desc
            }
        }).then(res => {
            setPosts(oldPosts => [res.data.data, ...oldPosts.slice(0, -1)])
            cancel.current.click()
            setName('')
            setPost('')
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modal}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">যা মন চায় লিখে ফেলুন</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className={`modal-body ${styles.modalBody}`}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">ছদ্মনাম (বাধ্যতামূলক নয়)</label>
                                <input type="text" className={`form-control ${styles.input}`} id="name"
                                    value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="post" className="form-label">
                                    মন খুলে লিখুন
                                    </label>
                                <textarea className={`form-control ${styles.textarea}`} id="post"
                                    value={post}
                                    onChange={e => setPost(e.target.value)}
                                    onKeyDown={_=> null} />
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center border-0">
                            <button type="submit" className="btn btn-outline-primary">
                                Submit
                            </button>
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                ref={cancel}>
                                Cancel
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
