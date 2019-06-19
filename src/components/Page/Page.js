import React from 'react'
import url from 'url'
import { connect } from 'react-redux'
import { animate } from '../../common/animateJs'

import PageList from './PageList'
import './Page.css'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageList: []
        }
        this.el = null
        this.id = null
        this.type = null
        this.type_id = null
        this.loading = false
    }

    // 创建Url
    getUrl() {
        let _url = url.parse(this.props.location.search, true)
        this.id = _url.query.id
        this.type = _url.query.type
        this.type_id = this.props[`${this.type}_id`]
        let listen = this.props.history.listen
        // 创建了监听函数
        // listen((listen) => {
        //     // page
        //     console.log('page-listen ')
        //     let contentWidth = Number(window.getComputedStyle(document.querySelector('.container')).transform.split(',')[4])
        //     let pageWidth = Number(window.getComputedStyle(document.querySelector('.page')).transform.split(',')[4])
        //     let pathName = listen.pathname
        //     if (pathName === '/') {
        //         animate(contentWidth, -225, document.querySelector('.container'))
        //         animate(pageWidth, 0, document.querySelector('.page'))
        //     }
        // })
    }
    // 创建pageList  id数组
    getPageList(id) {
        let type_id = this.type_id
        let indexId = Number(id)
        let newPageList = []
        type_id.forEach((val, index, array) => {
            if (indexId === val) {
                let _pprev = array[index - 2]
                let _prev = array[index - 1]
                let _mid = array[index]
                let _next = array[index + 1]
                let _nnext = array[index + 2]
                // arr 一个带有id的数组
                let arr = [[_pprev, _prev, _mid], [_prev, _mid, _next], [_mid, _next, _nnext]]
                arr.forEach(val => {
                    let obj = {}
                    if (!val[1]) {
                        obj = {
                            prevId: val[0],
                            indexId: 0,
                            nextId: val[2]
                        }
                    } else {
                        obj = {
                            prevId: val[0],
                            indexId: val[1],
                            nextId: val[2]
                        }
                    }
                    newPageList.push(obj)
                })
            }
        })
        this.setState({
            pageList: newPageList
        }, () => {
            console.log(this.state.pageList)
        })
    }
    // touchStare
    onTouchStart(ev) {
        // ev.currentTarget
        let el = ev.currentTarget
        let goBack = this.props.history.goBack
        let contentEl = document.querySelector('.container')
        let pageEl = document.querySelector('.page')
        let contentWidth = Number(window.getComputedStyle(contentEl).transform.split(',')[4])
        let pageWidth = Number(window.getComputedStyle(pageEl).transform.split(',')[4])
        let dx = ev.touches[0].clientX
        el.ontouchmove = (ev) => {
            let mx = ev.touches[0].clientX
            let vx = mx - dx
            let contentVx = vx / 2
            if (vx < 0) return
            contentEl.style.transform = `translateX(${contentWidth + contentVx}px) translateZ(0px)`
            pageEl.style.transform = `translateX(${pageWidth + vx}px) translateZ(0px)`
        }
        el.ontouchend = () => {
            this.touchEnd = true
            let width = document.documentElement.clientWidth
            // 最初时content的位置
            let _contentWidth = Number(window.getComputedStyle(contentEl).transform.split(',')[4])
            let _pageWidth = Number(window.getComputedStyle(pageEl).transform.split(',')[4])
            // 向左滑动 还原
            if (_pageWidth < -width / 2) {
                animate(_contentWidth, contentWidth, contentEl)
                animate(_pageWidth, -width, pageEl)
                // 向右滑动 返回首页    
            } else if (_pageWidth >= -width / 2) {
                new Promise((res) => {
                    animate(_contentWidth, -225, contentEl,res)
                    animate(_pageWidth, 0, pageEl,res)
                }).then(() => {
                    goBack()
                })
            }
            el.ontouchmove = null
            el.ontouchend = null
        }
    }

    onPrevListData(id) {
        console.log('执行下拉操作')
        // 1.getPageList
        this.getPageList(id)
        // 2.切换至中间层
        this.el = this.refs.pageContent
        let height = document.documentElement.clientHeight
        this.el.style.transform = `translateY(${-height}px) translateZ(0px)`
        // 3 修改history路径
        let replace = this.props.history.replace
        replace(`/page?${id}`)
    }
    onNextListData(id) {
        console.log('执行上拉操作')
        // 1.getPageList
        this.getPageList(id)
        // 2.切换至中间层
        this.el = this.refs.pageContent
        let height = document.documentElement.clientHeight
        this.el.style.transform = `translateY(${-height}px) translateZ(0px)`
        // 3 修改history路径
        let replace = this.props.history.replace
        replace(`/page?${id}`)
    }
    componentWillMount() {
        this.getUrl()
        this.getPageList(this.id)
    }
    render() {
        const style = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight * 3,
            transform: `translateY(-${document.documentElement.clientHeight}px)`,
            background: 'white',
        }
        // console.log(this.state.pageList)
        return (
            <div className='page-content' ref='pageContent' style={style} onTouchStart={this.onTouchStart.bind(this)}>
                {
                    this.state.pageList.length ?
                        this.state.pageList.map(val => {
                            return (
                                <div className={`page-content-list-${val.indexId}`} key={val.indexId}>
                                    <PageList
                                        onPrevListData={this.onPrevListData.bind(this)}
                                        onNextListData={this.onNextListData.bind(this)}
                                        prevId={val.prevId}
                                        indexId={val.indexId}
                                        nextId={val.nextId}
                                    />
                                </div>
                            )
                        }
                        ) : null
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        top_stories_id: state.top_stories_id,
        stories_id: state.stories_id,
    }
}

Page = connect(mapStateToProps)(Page)

export default Page