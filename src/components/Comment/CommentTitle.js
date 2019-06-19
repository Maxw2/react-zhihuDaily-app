import React from 'react'

const CommentTitle = (props)=>{
    const style = {
        width:document.documentElement.clientWidth,
        height:'45px',
        background:'rgb(2, 143, 214)',
        textAlign:'center',
        lineHeight:'45px',
        color:'white'
    }
    return (
        <div className='comment-title' style={style}>
            {`${props.commentNum}条评论`}
        </div>
    )
}

export default CommentTitle