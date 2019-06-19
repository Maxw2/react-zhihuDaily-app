import React from 'react'
import up from './images/up.svg'

const PageListTop = (props) => {
    const style = {
        width: '25px',
        height: '25px',
        transition: 'transform 0.2s ease',
        transform: props.switch ? 'rotate(180deg)' : 'rotate(0deg)'
    }
    return (
        <div className='page-list-top' style={{ width: '100%', height: '45px', position: 'absolute', top: '0px', marginTop: '-45px', display: 'flex', justifyContent: 'center' }}>
            {
                props.prevId ?
                    <div className='page-list-top-img' style={style}>
                        <img src={up} alt='upData' style={{ width: '100%' }} />
                    </div> : null
            }

            <div className='page-list-top-text'>
                <span style={{ color: '#ccc' }}>{
                    props.prevId ?
                        '下拉刷新上一篇' : '已经是第一篇'
                }</span>
            </div>
        </div>
    )
}

export default PageListTop