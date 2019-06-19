import React from 'react'
import like from './images/like.svg'

const CommentListContent = (props) => {

    function getDate() {
        let _month = {
            'Jan':'01',
            'Feb':'02',
            'Mar':'03',
            'Apr':'04',
            'May':'05',
            'Jun':'06',
            'Jul':'07',
            'Aug':'08',
            'Sep':'09',
            'Oct':'10',
            'Nov':'11',
            'Dec':'12'
        }
        let date = new Date(Date.now() - 1560753647).toString()
        let arr = date.split(' ')
        let month = arr[1]
        let day = arr[2]
        let time = arr[4]
        for (const key in _month) {
            if(month === key){
                return `${_month[key]}-${day} ${time}`
            }
        }


    }
    return (
        <div className='comment-list-content' style={{ display: 'flex', width: document.documentElement.clientWidth, borderBottom: '0.5px solid rgba(191,191,191,0.8)' }}>
            <div className='avatar' style={{ width: '20%', }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', overflow: 'hidden', margin: '15px auto' }}>
                    <img src={props.comment.avatar} alt='avatar' style={{ width: '100%' }} />
                </div>
            </div>
            <div className='content' style={{ width: '80%' }}>
                <div className='top' style={{ height: '45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='author' style={{ fontWeight: '600' }}>
                        <span>{props.comment.author}</span>
                    </div>
                    <div className='like' style={{ marginRight: '15px' }}>
                        <img src={like} alt='like' style={{ width: '16px' }} />
                        <span style={{ color: '#bfbfbf' }}>
                            {
                                props.comment.likes
                            }
                        </span>

                    </div>
                </div>
                <div className='middle' style={{marginRight:'20px'}}>
                    <span style={{fontSize:'15px'}}>
                      {
                        props.comment.content
                    }  
                    </span> 
                </div>
                <div className='bottom' style={{width:'100%',height:'45px',lineHeight:'45px',fontSize:'14px'}}>
                    <span>{getDate()}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentListContent