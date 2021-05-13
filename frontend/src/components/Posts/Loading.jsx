import ContentLoader from 'react-content-loader'
import Card from '../Card'

const Loading = () => {
    return (
        <div className="my-5">
            <Card>
                <ContentLoader
                    speed={1}
                    height={200}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#e3e3e3"
                    style={{ width: '100%' }}
                >
                    <rect x="80" y="12" rx="3" ry="3" height="8" style={{ width: '40%' }} />
                    <rect x="80" y="34" rx="3" ry="3" height="6" style={{ width: '50%' }} />

                    <rect x="0" y="70" rx="3" ry="3" height="7" style={{ width: '98%' }} />
                    <rect x="0" y="95" rx="3" ry="3" height="7" style={{ width: '98%' }} />
                    <rect x="0" y="120" rx="3" ry="3" height="7" style={{ width: '98%' }} />
                    <rect x="0" y="145" rx="3" ry="3" height="7" style={{ width: '46%' }} />
                    <rect x="50%" y="145" rx="3" ry="3" height="7" style={{ width: '8%' }} />
                    <circle cx="30" cy="30" r="30" />
                </ContentLoader>
            </Card>
        </div >
    )
}

export default Loading
