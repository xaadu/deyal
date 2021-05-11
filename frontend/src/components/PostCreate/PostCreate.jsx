import Modal from './Modal'

const PostCreate = ({ setPosts }) => {
    return (
        <div className="post-create-button-wrapper">
            <i></i> <button className="btn btn-def btn-write px-4 py-2" type="button" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i className="fal fa-pen"></i><span> লিখুন</span>
            </button>
            <Modal setPosts={setPosts} />
        </div>
    )
}

export default PostCreate
