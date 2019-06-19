import React from 'react'
import up from './images/up.svg'

const PageListBot = (props) => {
    const style = {
        width: '25px',
        height: '25px',
        transition: 'transform 0.2s ease',
        transform: props.switch ? 'rotate(180deg)' : 'rotate(0deg)'
    }
    return (
        <div className='page-list-bottom' style={{ position: 'absolute', width: '100%', height: '45px', marginBottom: '-45px', display: 'flex', justifyContent: 'center' }}>
            {
                props.nextId ?
                    <div className='page-list-top-img' style={style}>
                        <img src={up} alt='upData' style={{ width: '100%' }} />
                    </div> : null
            }
            <div className='page-list-top-text'>
                <span style={{ color: '#ccc' }}>
                    {
                        props.nextId ?
                            '上拉刷新下一篇' : '已经是最后一篇'
                    }
                </span>
            </div>
        </div>
    )
}

export default PageListBot