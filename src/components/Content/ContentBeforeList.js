import React from 'react'
import ContentList from './ContentList'

const ContentBeforeList = (props) => {
    return (
        <div className='content-before-list'>
            <ContentList {...props} />
        </div>
    )
}

export default ContentBeforeList