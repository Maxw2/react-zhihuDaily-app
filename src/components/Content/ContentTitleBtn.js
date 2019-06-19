import React from 'react'
import { animate } from '../../common/animateJs'
import btn from './image/btn.svg'

const ContentTitleBtn = () => {

    function onClick() {
        let indexEl = document.getElementsByClassName('container')[0]
        let indexPos = Number(window.getComputedStyle(indexEl, null).transform.split(',')[4])
        let tabWidth = document.getElementsByClassName('tab')[0].clientWidth
        if (indexPos === 0) {
            animate(0, -tabWidth, indexEl)
        } else if (indexPos === -tabWidth) {
            animate(-tabWidth, 0, indexEl)
        }
    }

    return (
        <div className='btn' style={{ width: '30px', height: '30px', margin: '5px 10px', position: 'absolute' }}
            onClick={onClick}>
            <img src={btn} style={{ width: '100%', margin: '0px' }} alt='btn' />
        </div>
    )
}

export default ContentTitleBtn