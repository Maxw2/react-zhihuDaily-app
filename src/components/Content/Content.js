import React from 'react'
import { connect } from 'react-redux'
import { bannerAnimate, titleAnimate } from '../../common/animateJs'
import { getTopData, getBeforeData} from '../../common/getData'

import ContentTitle from './ContentTitle'
import ContentTop from './ContentTop'
import ContentBefore from './ContentBefore'
import Scroll from '../../common/Scroll/Scroll'
import Loading from '../../common/Loading/Loding'

class Content extends React.Component {
    constructor() {
        super()
        this.scroll = null
        this.titleEl = null
        this.pEl = null
        this.bannerEl = null
        this.imgEl = null
        this.bannerHeight = null
        this.titleList = null
        this.dataLoading = false
    }
    getScroll(val) {
        this.scroll = val
        this.titleEl = document.querySelector('.content-title')
        this.spanEl = document.querySelector('.content-title span')
        this.bannerEl = document.querySelector('.content-banner')
        this.imgsEl = document.querySelectorAll('.content-banner-list .image')
        this.bannerHeight = this.bannerEl.clientHeight
        this.titleList = this.props.titleList
        this.scroll.on('onScroll', (ev) => {
            this.onScrollDown(ev)
            this.onScrollUp(ev)
        })
    }
    onScrollUp(ev) {
        let contentHeight = this.scroll.$dom.content_h - this.scroll.$dom.el_h
        // contentTitle
        if (ev.y <= 0) {
            titleAnimate(ev.y, this.titleList, this.titleEl, this.spanEl, '2,143,214', this.bannerHeight)
        }
        // getBeforeData
        if (ev.y < -contentHeight + 200) {
            if (this.dataLoading) return
            this.dataLoading = true
            getBeforeData()
                .then(getBeforeData)
                .then(() => { this.dataLoading = false })
        }
    }
    onScrollDown(ev) {
        // bannerAnimate
        if (ev.y > 0) {
            bannerAnimate(ev.y, this.bannerEl, this.imgsEl, this.bannerHeight)
        }
    }

    componentDidMount() {
        getTopData()
    }
    render() {
        const style = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            overflow: 'hidden'
        }
        return (
            <div className='content' style={{ margin: '0px' }}>
                {
                    this.props.topData && this.props.beforeData.length ?
                        <>
                            <ContentTitle />
                            <Scroll className='scroll' style={style} options={{ scrollX: false, direction: 'Y', scrollBar: true, sideLock: [100, null] }} getScroll={this.getScroll.bind(this)}>
                                <div>
                                    <ContentTop topData={this.props.topData} />
                                    <ContentBefore beforeData={this.props.beforeData} />
                                </div>
                            </Scroll> </> : <Loading />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        date: state.date,
        topData: state.topData,
        beforeData: state.beforeData,
        titleList: state.titleList
    }
}
Content = connect(mapStateToProps)(Content)

export default Content