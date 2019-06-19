import React from 'react'
import { connect } from 'react-redux'
import getDateWeek from '../../common/getDateWeek'
import './ContentTitle.css'

class ContentBeforeTitle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.titleList = []
    }
    
    getTitleList(){
        let top = this.refs.beforeTitle.offsetTop
        let date = getDateWeek(this.props.date)
        let arr = [top,date]
        return arr
    }
    componentDidMount(){
        this.props.onGetTitleList(this.getTitleList())
    }
    render() {
        return (
            <div ref='beforeTitle' className='before-title title' style={{ background: 'rgb(2, 143, 214)' }}>
                <span style={{ color: 'white' }}>{getDateWeek(this.props.date)}</span>
            </div>
        )
    }

}

const mapDispatchToProp = (dispatch) => {
    return {
        onGetTitleList: (arr) => {
            dispatch({
                type: 'GET_TITLELIST',
                titleList: arr
            })
        }
    }
}

ContentBeforeTitle = connect(null, mapDispatchToProp)(ContentBeforeTitle)

export default ContentBeforeTitle      