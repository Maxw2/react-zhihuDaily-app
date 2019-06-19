import React from 'react'
import { animate } from '../../common/animateJs'
import Axios from 'axios'

import Content from '../Content/Content'
import Tab from '../Tab/Tab'

class Index extends React.Component {
    constructor() {
        super()
        this.container = null
        this.tabWidth = null
    }
    // Index 左右滑动
    onTouchStart(ev) {
        let that = this
        let el = ev.currentTarget
        let dx = ev.touches[0].clientX
        let contentWidth = Number(window.getComputedStyle(el).transform.split(',')[4])
        let pos = contentWidth
        el.ontouchmove = function (ev) {
            let mx = ev.touches[0].clientX
            let vx = mx - dx
            pos = contentWidth + vx
            if (pos < -that.tabWidth) {
                pos = -that.tabWidth
                el.style.transform = `translateX(${-that.tabWidth}px) translateZ(0px)`
            } else if (pos > 0) {
                pos = 0
                el.style.transform = `translateX(${0}px) translateZ(0px)`
            } else {
                el.style.transform = `translateX(${pos}px) translateZ(0px)`
            }

        }
        el.ontouchend = function () {
            let tabW = -that.tabWidth / 2
            if (pos > tabW) {
                animate.call(that, pos, 0, el)
            } else if (pos < tabW) {
                animate.call(that, pos, -that.tabWidth, el)
            }
            el.ontouchmove = null
            el.ontouchend = null
        }
    }
    // 服务器跨域
    getLatest(){
        Axios.get('https://news-at.zhihu.com/api/4/news/latest')
            .then(res=>{
                console.log(res)
            })
    }
    componentDidMount() {
        this.container = document.querySelector('.container')
        this.tabWidth = document.querySelector('.tab').clientWidth
        this.container.style.transform = `translateX(-${this.tabWidth}px)`
        this.getLatest()
    }
    render() {
        return (
            <div className='container' style={{ display: 'flex', float: 'left' }} onTouchStart={this.onTouchStart.bind(this)} >
                <Tab />
                <Content />
            </div>
        )
    }

}

export default Index