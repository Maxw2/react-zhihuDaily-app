import React from 'react'
import { withRouter } from 'react-router-dom'
import { getCommentData } from '../../common/getData'
import { animate } from '../../common/animateJs'
import AnimateLink from '../../common/AnimateLink'

import arrow from './images/arrow.svg'
import like from './images/like.svg';
import share from './images/share.svg'
import message from './images/message.svg'
import './PageListComment.css'

class PageListComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0
        }
    }
    getCommentData() {
        let id = this.props.indexId
        if (id === 0) return
        getCommentData(id, (res) => {
            let len = res.longComment.comments.length + res.shortComment.comments.length
            this.setState({
                num: len
            })
        })
    }
    onClickLeft(ev) {
        ev.stopPropagation()
        let goBack = this.props.history.goBack
        let contentEl = document.querySelector('.container')
        let pageEl = document.querySelector('.page')
        let contentWidth = Number(window.getComputedStyle(contentEl).transform.split(',')[4])
        let pageWidth = Number(window.getComputedStyle(pageEl).transform.split(',')[4])
        new Promise((res) => {
            animate(contentWidth, -225, contentEl, res)
            animate(pageWidth, 0, pageEl, res)
        }).then(()=>{
            goBack()
        })

        // goBack()
    }
    onClickDown(ev) {
        ev.stopPropagation()
        if (!this.props.nextId) return
        this.props.onPageNextListData(this.props.nextId)
        console.log('123')
    }
    componentDidMount() {
        this.getCommentData()
    }
    render() {
        return (
            <div className='page-list-comment' >
                <div className='icon arrow-left' >
                    <div className='page-list-comment-img' >
                        <img src={arrow} alt='arrow-left' onClick={this.onClickLeft.bind(this)} />
                    </div>
                </div>
                <div className='icon arraw-down' >
                    <div className='page-list-comment-img'>
                        <img src={arrow} alt='arrow-down' onClick={this.onClickDown.bind(this)} />
                    </div>
                </div>
                <div className='icon like'>
                    <div className='page-list-comment-img'>
                        <img src={like} alt='like' />
                    </div>
                </div>
                <div className='icon share'>
                    <div className='page-list-comment-img'>
                        <img src={share} alt='share' />
                    </div>
                </div>
                <div className='icon message' style={{ position: 'relative' }}>
                    <AnimateLink to={`/page/comment/${this.props.indexId}`} outSide={document.querySelector('.page')} inSide={document.querySelector('.comment')}>
                        <div className='page-list-comment-img'>
                            <img src={message} alt='message' />
                        </div>
                        <div className='page-list-comment-number'>
                            <span>{this.state.num}</span>
                        </div>
                    </AnimateLink>
                </div>
            </div>
        )
    }
}

PageListComment = withRouter(PageListComment)
export default PageListComment