import Modal from './Modal/Modal'
import styles from './PostCreate.module.scss'

const PostCreate = ({ setPosts }) => {
    return (
        <div>
            <i></i> <button className={styles.launcherButton} type="button" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                <i className="fal fa-pen"></i><span>লিখুন</span>
            </button>
            <Modal setPosts={setPosts} />
        </div>
    )
}

export default PostCreate
