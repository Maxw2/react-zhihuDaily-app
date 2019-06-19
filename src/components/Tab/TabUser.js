import React from 'react'
import timg from './image/timg.jpg'


const TabUser = function () {
    return (
        <div className='tab-user' style={{width:'100%',height:'54px',display:'flex',margin:'20px 0px'}}>
            <div className='image' style={{width:'35px',height:'35px',borderRadius:'50%',overflow:'hidden',margin:'auto 10px',background:'#5b5b5b'}}>
                <img src={timg} alt='用户头像' style={{width: '100%'}}/>
            </div>
            <div className='text'>
                <p style={{color:'#74797e'}}>请登录</p>
            </div>
        </div>
    )
}

export default TabUser