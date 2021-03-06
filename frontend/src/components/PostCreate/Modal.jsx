import { useState, useRef } from 'react'

import axios from 'axios'

import { store } from 'react-notifications-component'


const Modal = ({ setPosts }) => {

    const [name, setName] = useState('')
    const [post, setPost] = useState('')

    const modal = useRef()
    const cancel = useRef()

    const descInput = useRef()
    const nameInput = useRef()

    const handleDesc = e => {
        if (descInput.current.className === 'form-control is-invalid')
            descInput.current.className = 'form-control'
        setPost(e.target.value)
    }
    const handleName = e => {
        if (nameInput.current.className === 'form-control is-invalid')
            nameInput.current.className = 'form-control'
        setName(e.target.value)
    }

    const handleForm = e => {
        e.preventDefault()

        let description = post

        if (description === '') {
            descInput.current.className = 'form-control is-invalid'
            return
        }

        axios({
            method: 'POST',
            url: `https://api.xstechisland.tk/deyal/v1/posts`,
            data: {
                name: name,
                description: description,
            }
        }).then(res => {
            if (res.data.status === 'failed') {
                const { issue_title, issue_description } = res.data
                cancel.current.click()
                store.addNotification({
                    title: issue_title,
                    message: issue_description,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__zoomInDown"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                })
            } else {
                setPosts(oldPosts => [res.data.data, ...oldPosts.slice(0, -1)])
                cancel.current.click()
                store.addNotification({
                    title: "Success",
                    message: "You have successfully posted. Post minimum after 5 minutes.",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__zoomInDown"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                })
                setName('')
                setPost('')
            }

        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modal}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">?????? ?????? ????????? ???????????? ???????????????</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>

                    <div className="modal-body">
                        <form id="post-create" onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">????????????????????? (????????????????????????????????? ??????)</label>
                                <input type="text" className="form-control" id="name"
                                    maxLength="30"
                                    value={name}
                                    onChange={handleName}
                                    ref={nameInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="post" className="form-label">
                                    ?????? ???????????? ??????????????? *
                                    </label>
                                <textarea className="form-control" id="post"
                                    maxLength="5000"
                                    value={post}
                                    onChange={handleDesc}
                                    onKeyDown={_ => null}
                                    ref={descInput}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer d-flex justify-content-center border-0">
                        <button type="submit"
                            className="btn btn-outline-primary mx-2"
                            form="post-create"
                        >
                            ??????????????? ????????????
                            </button>
                        <button type="button"
                            className="btn btn-outline-danger mx-2"
                            data-bs-dismiss="modal"
                            ref={cancel}
                            form="post-create"
                        >
                            ??????????????? ????????????
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
