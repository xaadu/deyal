import Posts from '../../components/Posts/Posts'
import style from './Home.module.scss'

const Home = () => {
    return (
        <div className='container py-5'>
            <h2 className={style.h2}>দেয়াল</h2>
            <Posts />
        </div>
    )
}

export default Home
