import Posts from '../components/Posts/Posts'

const Home = () => {
    return (
        <section className="home">
            <div className='container py-5'>
                <div className="heading py-3">
                    <h2 className='section-heading lang-ban'>দেয়াল</h2>
                    <h4 className='section-sub-heading lang-ban'> মন খুলে মনের কথা লিখুন </h4>
                </div>
                <div className="posts">
                    <Posts />
                </div>
            </div>
        </section>
    )
}

export default Home
