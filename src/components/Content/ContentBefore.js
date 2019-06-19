import React from 'react'

import ContentBeforeTitle from './ContentBeforeTitle'
import ContentBeforeList from './ContentBeforeList'

class ContentBefore extends React.Component {
    render() {
        return (
            <div className='content-before'>
                {
                    this.props.beforeData.map((val, index) => {
                        return (
                            <div className={`content-before-${index}`} key={index}>
                                <ContentBeforeTitle date={val.date} />
                                <ContentBeforeList stories={val.stories} />
                            </div>
                        )

                    })
                }
            </div>
        )
    }

}


export default ContentBefore