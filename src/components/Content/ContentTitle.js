import React from 'react'
import ContentTitleBtn from './ContentTitleBtn'
import './ContentTitle.css'

const ContentTitle = (props)=>{

    return (
        <div className='content-title title' style={{width:document.documentElement.clientWidth}}>
            <ContentTitleBtn />
            <span style={{color:'white'}}>每日新闻</span>
        </div>
    )
}

export default ContentTitle