import React from 'react'
import CommentListContent from './CommentListContent'

import longComment from '../../json/longComment.json'

const CommentListLong = (props) => {
    let long = props.longComments.comments
    return (
        <div className='comment-list-long' >
            <div style={{ width: '100%', height: '45px', borderBottom: '0.5px solid rgba(191,191,191,0.5)', color: 'black', lineHeight: '45px', }}>
                <span style={{ marginLeft: '15px', fontWeight: '600' }}>
                    {`${long.length}条长评`}
                </span>
            </div>
            <div className='long-comment-list'>
                {
                    long.map((val) => {
                        return (
                            <CommentListContent comment={val} key={val.id} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default CommentListLong