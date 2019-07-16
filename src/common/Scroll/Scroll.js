import React from 'react'
// import CScroll from './es_CScroll'
import CScroll from 'crash-scroll'

class Scroll extends React.Component{
    componentDidMount(){
        this.scroll = new CScroll(this.refs.scroll,this.props.options)
        if(this.props.getScroll) this.props.getScroll(this.scroll)
    }
    componentDidUpdate(){
        this.scroll.refresh()
    }
    render(){
        return (
            <div ref='scroll' className={this.props.className} style={this.props.style} >
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default Scroll