import ContentLoader from 'react-content-loader'
import Card from '../Card'

const Loading = () => {
    return (
        <div className="my-5">
            <Card>
                <ContentLoader
                    speed={1}
                    height={230}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#e3e3e3"
                    //backgroundColor="red"
                    //foregroundColor="blue"
                    style={{ width: '100%' }}
                >
                    <rect x="94" y="30" rx="3" ry="3" height="14" style={{ width: '55%' }} />
                    <rect x="94" y="64" rx="3" ry="3" height="6" style={{ width: '36%' }} />

                    <rect x="20" y="110" rx="3" ry="3" height="7" style={{ width: '92%' }} />
                    <rect x="20" y="135" rx="3" ry="3" height="7" style={{ width: '92%' }} />
                    <rect x="20" y="160" rx="3" ry="3" height="7" style={{ width: '92%' }} />
                    <rect x="20" y="185" rx="3" ry="3" height="7" style={{ width: '46%' }} />
                    <rect x="52%" y="185" rx="3" ry="3" height="7" style={{ width: '8%' }} />
                    <circle cx="47" cy="50" r="30" />
                </ContentLoader>
            </Card>
        </div >
    )
}

export default Loading
