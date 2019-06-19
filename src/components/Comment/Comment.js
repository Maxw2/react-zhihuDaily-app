import React from 'react'
import { animate } from '../../common/animateJs'
import { connect } from 'react-redux'

import CommentTitle from './CommentTitle'
import CommentList from './CommentList'
import CommentBot from './CommentBot';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.indexId = this.props.match.params.id
        this.commentList = this.props.commentList[this.indexId]
        this.commentNum = this.commentList.longComment.comments.length + this.commentList.shortComment.comments.length
    }
    onTouchStart(ev) {
        console.log('comment')
        let that = this
        let commentEl = document.querySelector('.comment')
        let pageEl = document.querySelector('.page')
        let commentWidth = Number(window.getComputedStyle(commentEl).transform.split(',')[4])
        let pageWidth = Number(window.getComputedStyle(pageEl).transform.split(',')[4])
        let el = ev.currentTarget
        let dx = ev.touches[0].clientX
        let pageVx = null
        let commentVx = null
        el.ontouchmove = function (ev) {
            let vx = ev.touches[0].clientX - dx
            pageVx = pageWidth + (vx / 2)
            commentVx = commentWidth + vx
            if (commentVx <= commentWidth) {
                pageVx = pageWidth
                commentVx = commentWidth
                pageEl.style.transform = `translateX(${pageVx}px)`
                commentEl.style.transform = `translateX(${commentWidth}}px)`
            } else if (commentVx >= 0) {
                pageVx = pageWidth + (document.documentElement.clientWidth / 2)
                pageEl.style.transform = `translateX(${pageVx}px)`
                commentEl.style.transform = `translateX(${0}px)`
            } else {
                pageEl.style.transform = `translateX(${pageVx}px)`
                commentEl.style.transform = `translateX(${commentVx}px)`
            }
        }
        el.ontouchend = function () {
            if(!pageVx || !commentVx) return  
            // 复原
            if (commentVx < -document.documentElement.clientWidth / 2) {
                animate(pageVx, pageWidth, pageEl)
                animate(commentVx, commentWidth, commentEl)
            } else {
                console.log(pageVx)
                new Promise((res) => {
                    animate(pageVx, -document.documentElement.clientWidth, pageEl,res)
                    animate(commentVx, 0, commentEl,res)
                }).then(()=>{
                    that.props.history.goBack()
                })
            }
            el.ontouchmove = null
            el.ontouchend = null
        }
    }

    render() {
        const style = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            background:'white'
        }
        return (
            <div style={style} onTouchStart={this.onTouchStart.bind(this)}>
                <CommentTitle commentNum={this.commentNum} />
                <CommentList commentList={this.commentList} />
                <CommentBot />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        commentList: state.commentList,
    }
}

Comment = connect(mapStateToProps)(Comment)
export default Comment