import React from 'react'

import ContentTopBanner from './ContentTopBanner'
import ContentTopList from './ContentTopList'

class ContentTop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top_stories: this.props.topData.top_stories,
            stories: this.props.topData.stories
        }
    }

    render() {
        return (
            <div className='contentTop'>
                <ContentTopBanner top_stories={this.state.top_stories} />
                <ContentTopList stories={this.state.stories} />
            </div>
        )
    }

}

export default ContentTop