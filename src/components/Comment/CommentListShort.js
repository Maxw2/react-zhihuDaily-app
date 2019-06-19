import React from 'react'

import shortComment from '../../json/shortComment.json'
import CommentListContent from './CommentListContent'

const CommentListShort = (props) => {
    let short = props.shortComments.comments
    
    // 不做了
    // function onTouchStart() {
    //     let list = document.querySelector('.short-comment-list')
    //     console.log(props.scroll)
    // }

    return (
        <div className='comment-list-short'>
            <div style={{ width: '100%', height: '45px', borderBottom: '0.5px solid rgba(191,191,191,0.5)', color: 'black', lineHeight: '45px' }} >
                <span style={{ marginLeft: '15px', fontWeight: '600' }}>
                    {`${short.length}条短评`}
                </span>
            </div>
            <div className='short-comment-list'>
                {
                    short.map((val) => {
                        return (
                            <CommentListContent comment={val} key={val.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CommentListShort