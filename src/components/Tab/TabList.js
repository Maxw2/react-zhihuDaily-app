import React from 'react'
import 首页 from './image/首页.svg'

const TabList = function () {
    const list = [['home', 首页, '首页']]
    return (
        <div className="list">
            {
                list.map((val, index) => {
                    return (
                        <div className={val[0]} key={index} style={{ display: 'flex', width: '100%', height: '56px', background: '#1b2329' }}>
                            <div style={{width:'24px',height:'24px',margin:'auto 10px'}}>
                                <img src={val[1]} alt={val[2]} style={{width:'100%'}}/>
                            </div>
                            <p style={{ color: '#fff' }}>{val[2]}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TabList