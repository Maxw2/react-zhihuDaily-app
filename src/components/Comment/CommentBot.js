import React from 'react'
import { animate } from '../../common/animateJs'
import { withRouter } from 'react-router-dom'

import arrow from './images/arrow.svg'
import comment from './images/comment.svg'

let CommentBot = (props) => {
    console.log(props)
    function onTouchStart() {
        let pageEl = document.querySelector('.page')
        let pageWidth = Number(window.getComputedStyle(pageEl).transform.split(',')[4])
        let commentEl = document.querySelector('.comment')
        let commentWidth = Number(window.getComputedStyle(commentEl).transform.split(',')[4])
        new Promise((res) => {
            animate(pageWidth, -document.documentElement.clientWidth, pageEl, res)
            animate(commentWidth, 0, commentEl, res)
        }).then(() => {
            props.history.goBack()
        })
    }
    const style = {
        position: 'fixed',
        bottom: '0px',
        width: document.documentElement.clientWidth,
        height: '40px',
        background: '#3d3d3d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div className='comment-bottom' style={style}>
            <div className='comment-bot-arrow' style={{ position: 'absolute', left: '15px', transform: 'rotate(90deg)' }} >
                <img src={arrow} alt='arrow' style={{ width: '30px', height: '30px' }} onClick={onTouchStart.bind(this)} />
            </div>
            <div className='text'>
                <img src={comment} alt='comment' style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                <span style={{ color: 'white', fontSize: '14px' }}>写评论</span>
            </div>
        </div>
    )
}

CommentBot = withRouter(CommentBot)
export default CommentBot