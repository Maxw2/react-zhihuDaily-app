import React from 'react'
import { getNewsData } from '../../common/getData'
import { bannerAnimate } from '../../common/animateJs'

import Loading from '../../common/Loading/Loding'
import './PageListContent.css'

class PageListContent extends React.Component {
    constructor() {
        super()
        this.state = {
            pageList: null
        }
        this.scroll = null
        this.linkEl = null
    }
    // 创建Link
    createLink() {
        let css = this.state.pageList.css
        this.link = document.createElement('link')
        this.link.setAttribute('rel', 'stylesheet')
        this.link.setAttribute('type', 'text/css')
        this.link.setAttribute('href', css)
        document.querySelector('head').appendChild(this.link)
    }
    removeLink() {
        if (!this.link) return
        document.querySelector('head').removeChild(this.link)
    }
    // 创建抬头图片
    createImg() {
        let that = this
        // 清除main的overflow:hidden
        let main = document.querySelectorAll('.content-wrap')
        for (let i = 0; i < main.length; i++) {
            main[i].style.overflow = 'visible'
        }
        // 
        let el = this.refs.content.querySelector('.img-place-holder')
        el.innerHTML =
            `<div class='img-content'>
                <img src=${this.state.pageList.image} alt=${this.state.pageList.ga_prefix}/>
            </div>`
        // imgLoad 
        let imgEl = document.querySelectorAll('.main-wrap img')
        for (let i = 0; i < imgEl.length; i++) {
            imgEl[i].onload = function () {
                that.scroll.refresh()
            }
        }
    }

    onScroll() {
        let bannerEl = this.refs.content.querySelector(".img-content")
        let imgEl = bannerEl.querySelector('img')
        // onScroll
        this.scroll.on('onScroll', (ev) => {
            // 下拉
            if (ev.y > 0) {
                bannerAnimate(ev.y, bannerEl, imgEl, 200)
            }
        })
    }
    componentDidMount() {
        if (this.props.indexId === 0) return
        getNewsData(this.props.indexId, (res) => {
            let data = res.data
            this.setState({
                pageList: data
            }, () => {
                this.createLink()
                this.createImg()
                this.onScroll()
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.scroll === nextProps.scroll) return
        this.scroll = nextProps.scroll
    }
    componentWillUnmount() {
        this.removeLink()
    }
    render() {
        return (
            this.state.pageList ?
                <div className='page-list-content' ref='content' dangerouslySetInnerHTML={{ __html: this.state.pageList.body }}></div>
                : <Loading />
        )
    }

}
 
export default PageListContent