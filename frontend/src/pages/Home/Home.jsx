import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

const Home = () => {
    return (
        <div>
            <h2 style={styles.h2}>দেয়াল</h2>
            <Link to='/about'>About</Link>
        </div>
    )
}

export default Home
