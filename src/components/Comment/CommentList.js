import React from 'react'
import Scroll from '../../common/Scroll/Scroll'

import CommentListLong from './CommentListLong'
import CommentListShort from './CommentListShort'

class CommentList extends React.Component {
    constructor(){
        super()
        this.state = {
            scroll: null
        }
    }
    getScroll(val){
        this.setState({
            scroll:val
        })
    }
    render() {
        const scrollStyle = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight - 45,
            overflow: 'hidden'
        }
        const listStyle = {
            width: document.documentElement.clientWidth,
            minHeight: document.documentElement.clientHeight - 45,
            position:'relative',
            paddingBottom:'40px',
            background:'white'
        }
        return (
            <Scroll className='comment-list-scroll' style={scrollStyle} options={{scrollX: false, direction: 'Y', scrollBar: true}} getScroll={this.getScroll.bind(this)}>
                <div className='comment-list' style={listStyle}>
                    <CommentListLong longComments={this.props.commentList.longComment} />
                    <CommentListShort shortComments={this.props.commentList.shortComment} scroll={this.state.scroll}/> 
                </div>
            </Scroll>
        )
    }
}


export default CommentList