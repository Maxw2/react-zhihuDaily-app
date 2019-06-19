import React from 'react'
import 收藏 from './image/收藏.svg'
import 消息 from './image/消息.svg'
import 设置 from './image/设置.svg'


const TabOpiton = function () {
    const list = [['collect',收藏,'收藏'],['news',消息,'消息'],['option',设置,'设置']]
    return (
        <div className='option' style={{width:'100%',marginTop:'10px',display:'flex'}}>
            {
                list.map((val,index)=>{
                    return(
                        <div className={val[0]} style={{width:'54px',height:'70px',textAlign:'center',marginRight:'10px'}} key={index}>
                            <div style={{width:'18px',height:'18px',margin:'10px auto'}}>
                                <img src={val[1]} alt={val[2]}  style={{width:'100%'}}/>
                            </div>
                            <p style={{color:'#74797e',margin:'0px'}}>{val[2]}</p>  
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TabOpiton