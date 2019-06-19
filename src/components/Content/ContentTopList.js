import React from 'react'
import ContentList from './ContentList'

const ContentTopList = (props)=>{
    return (
        <div className='content-top-list'>
            <ContentList {...props} />
        </div>
    )
    
}

export default ContentTopList