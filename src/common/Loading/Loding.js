import React from 'react'
import loading from './image/Rolling-1s-200px.svg'


const Loading = () => {
    const style = {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const imgStyle = {
        width:'50px',
        lineHeight: '50px'
    }
    return (
        <div className='loading' style={style}>
            <img src={loading} style={imgStyle} alt='loading' />
        </div>
    )
}

export default Loading