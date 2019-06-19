import React from 'react'
import AnimateLink from '../../common/AnimateLink'

import './ContentList.css'

const ContentList = (props) => {
    let data = props.stories
    return (
        <ul className='content-list'>
            {
                data ?
                    data.map(val => {
                        return (
                            <li className={val.id} data-type={val.id} key={val.id}>
                                <AnimateLink to={`/page?type=stories&&id=${val.id}`} outSide={document.querySelector('.container')} inSide={document.querySelector('.page')}>
                                    <div className='text'>
                                        <span>{val.title}</span>
                                    </div>
                                    <div className='image'>
                                        <img src={val.images} alt={val.ga_prefix} style={{margin:'0px'}}/>
                                    </div>
                                </AnimateLink>
                            </li>
                        )
                    }) : null
            }
        </ul>
    )
}

export default ContentList