import React from 'react'
import {Link} from 'react-router-dom'
import {animate} from '../common/animateJs'

/**
 * 
 * @param {Object} props 
 * @param {Node} outSide
 * @param {Node} inSide
 */
const AnimateLink = (props)=>{

    function onClick(){
        // let indexEl = document.querySelector('.container')
        let outSide = props.outSide
        let outSide_from = Number(window.getComputedStyle(outSide).transform.split(',')[4])
        let outSide_to = -(document.documentElement.clientWidth / 2) + outSide_from
        let inSide = props.inSide
        let inSide_to = -document.documentElement.clientWidth
        
        animate(outSide_from,outSide_to,outSide)
        animate(0,inSide_to,inSide)
    }
    return(
        <Link to={props.to} onClick={onClick}>
            {
                props.children
            }
        </Link>
        
    )
}

export default AnimateLink