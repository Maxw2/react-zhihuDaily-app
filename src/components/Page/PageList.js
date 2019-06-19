import React from 'react'
import Scroll from '../../common/Scroll/Scroll'
import { animateY } from '../../common/animateJs'

import PageContent from './PageListContent'
import PageListComment from './PageListComment'
import PageListTop from './PageListTop'
import PageListBot from './PageListBot'
// import './PageList.css'

class PageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scroll: null,
            switch: false
        }
    }
    getScroll(val) {
        this.setState({
            scroll: val
        }, () => {
            this.onScroll()
        })
    }
    //pageList
    onPagePrevListData() {
        // 滑动至上一页面 然后执行更新数据
        let pageContent = document.querySelector('.page-content')
        new Promise((res) => {
            animateY(-document.documentElement.clientHeight, 0, pageContent, res)
        }).then(() => {
            this.props.onPrevListData(this.props.prevId)
            this.state.scroll.initSetPos()
        })
    }
    onPageNextListData(nextId) {
        let pageContent = document.querySelector('.page-content')
        new Promise((res) => {
            animateY(-document.documentElement.clientHeight, -document.documentElement.clientHeight * 2, pageContent, res)
        }).then(() => {
            console.log('pageList')
            this.props.onNextListData(nextId)
            this.state.scroll.initSetPos()
        })
    }
    // 事件
    onScroll() {
        // onScroll
        this.state.scroll.on('onScroll', (ev) => {
            let content_h = this.state.scroll.$dom.content_h - this.state.scroll.$dom.el_h
            // Switch
            if (ev.y > 50 || ev.y < -(content_h + 70)) {
                this.setState((prevState) => {
                    if (prevState.switch === true) return
                    return {
                        switch: true
                    }
                })
            } else {
                this.setState((prevState) => {
                    if (prevState.switch === false) return
                    return {
                        switch: false
                    }
                })
            }
        })

        // onTouchEnd
        this.state.scroll.on('onTouchEnd', (ev) => {
            let content_h = this.state.scroll.$dom.content_h - this.state.scroll.$dom.el_h
            // Switch 初始化
            this.setState((prevState) => {
                if (prevState.switch === false) return
                return {
                    switch: false
                }
            })
            // 下拉载入上一篇
            if (ev.y > 50 && this.props.prevId) {
                this.onPagePrevListData()
            }
            // 上拉载入下一篇
            if (ev.y < -(content_h + 70) && this.props.nextId) {
                this.onPageNextListData(this.props.nextId)
            }
        })
    }
    componentWillUnmount() {
        this.state.scroll.removeEvent()
    }
    render() {
        const style = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            position: 'relative',
            overflow: 'hidden'
        }
        return (
            <>
                <Scroll className='page-list-scroll' style={style} options={{ scrollBar: true, direction: 'Y', sideLock: [70, null] }} getScroll={this.getScroll.bind(this)}>
                    <div className='page-list' ref='pageList' style={{ width: '100%', position: 'relative', minHeight: '1000px' }}>
                        <PageContent indexId={this.props.indexId} onPageScroll={this.onScroll.bind(this)} scroll={this.state.scroll} />
                        <div style={{ width: '100%', height: '40px' }}></div>
                        <PageListTop prevId={this.props.prevId} switch={this.state.switch} />
                        <PageListBot nextId={this.props.nextId} switch={this.state.switch} />
                    </div>
                    <PageListComment indexId={this.props.indexId} nextId={this.props.nextId} onPageNextListData={this.onPageNextListData.bind(this)} />
                </Scroll>
            </>
        )
    }

}



export default PageList