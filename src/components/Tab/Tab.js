import React from 'react'

import TabUser from './TabUser'
import TabOption from './TabOption'
import TabList from './TabList'


class Tab extends React.Component {
    render() {
        const style = {
            width: document.documentElement.clientWidth * .6,
            height: document.documentElement.clientHeight,
            background: '#232a30'
        }
        return (
            <div className='tab' style={style} >
                <TabUser />
                <TabOption />
                <TabList />
            </div >
        )
    }
}

export default Tab