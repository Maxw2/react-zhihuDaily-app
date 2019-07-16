import React from 'react'
import AnimateLink from '../../common/AnimateLink'
import Scroll from '../../common/Scroll/Scroll'
import './ContentTopBanner.css'

const ContentBanner = (props) => {
    let data = props.top_stories
    // console.log(data)
    const style = {
        width: document.documentElement.clientWidth,
        height: '200px',
    }
    const options = {
        scrollX: true,
        direction: 'x',
        swiper: {
            loop: true
        }
    }
    return (
        <div style={style}>
            <Scroll className='content-banner' style={{width:'100%',height:'100%',overflow:'hidden'}}  options={options}>
                <ul className='content-banner-list'>
                    {
                        data ?
                            data.map((val, index) => {
                                return (
                                    <li className={val.id} data-type={index} style={{ width: document.documentElement.clientWidth}} key={index}>
                                        <AnimateLink to={`/page?type=top_stories&&id=${val.id}`} outSide={document.querySelector('.container')} inSide={document.querySelector('.page')}>
                                        <div className="image" style={{}}>
                                            <img className='banner-img' src={val.image} alt={val.ga_prefix} style={{margin:'0px'}}/>
                                        </div>
                                        <div className='text'>
                                            <p>{val.title}</p>
                                        </div>
                                        </AnimateLink>
                                    </li>
                                )
                            }) : null
                    }
                </ul>
            </Scroll>
        </div>
    )
}

export default ContentBanner

