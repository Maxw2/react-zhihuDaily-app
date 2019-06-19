
/**
 * @method 元素的动画滑动，仅限X轴
 * @param {Number} from     从
 * @param {Number} to       到
 * @param {Node}   el       元素
 * @param {Number} time     时间
 */
const animate = (from, to, el, promise,time) => {
    let left = null
    let distance = from - to
    let pos = from 
    let _time = null
    let num = 0
    from > to ?
        left = true : left = false
    const transform = () => {
        // 防止卡死
        num++
        if (num === 1000) {
            window.cancelAnimationFrame(_time)
            left = null
            distance = null
            pos = null
            _time = null
            num = null
            console.log('MAX')
            return 
        }

        if(pos <= to && left){
            el.style.transform = `translateX(${to}px) translateZ(0px)`
            if(promise) promise()
            
            left = null
            distance = null
            pos = null
            _time = null
            num = null
            return 
        }else if (left) {
            pos -= distance * 0.1
            el.style.transform = `translateX(${pos}px) translateZ(0px)`
            window.requestAnimationFrame(transform)
        }

        if (pos >= to && !left) {
            el.style.transform = `translateX(${to}px) translateZ(0px)`
            if(promise) promise()
            left = null
            distance = null
            pos = null
            _time = null
            num = null
            return
        } else if(!left){
            pos -= distance * 0.1
            el.style.transform = `translateX(${pos}px) translateZ(0px)`
            window.requestAnimationFrame(transform)
        }

    }
    transform()
}
/**
 * @method Y轴方向
 * @param {Number} from 
 * @param {Number} to 
 * @param {Node} el 
 * @param {Function} promise 
 */
const animateY = (from ,to ,el , promise) =>{
    let up = null
    let distance = Math.abs(from - to)
    let pos = from 
    let num = 0
    to > from ?
        up = true : up = false
    function transform(){
        // 
        num++
        if(num > 500) {
            up = null
            distance = null
            pos = null
            num = null
            console.log('MAX')
            return 
        }

        if(up && pos >= to){
            el.style.transform = `translateY(${to}px) translateZ(0px)`
            promise()
            return 
        }else if(up){
            pos += distance * 0.1
            el.style.transform = `translateY(${pos}px) translateZ(0px)`
        }

        if(!up && pos <= to){
            el.style.transform = `translateY(${to}px) translateZ(0px)`
            promise()
            return 
        }else if(!up){
            pos -= distance * 0.1
            el.style.transform = `translateY(${pos}px) translateZ(0px)`
        }
        window.requestAnimationFrame(transform)
    }
    transform()
}

/**
 * @method 轮播图的动画效果，仅限Y轴
 * @param {Number} y 
 * @param {Node} bannerEl 
 * @param {Node} imgsEl 
 * @param {Number} bannerHieght 
 */
const bannerAnimate = (y,bannerEl,imgsEl,bannerHieght)=>{
    let el = bannerEl 
    let scale = y / bannerHieght + 1
    
    el.style.transform = `translateY(-${y}px) translateZ(0px)`
    el.style.height = bannerHieght + y + 'px'

    for(let i = 0;i < imgsEl.length;i++){
        imgsEl[i].style.transform = `scale(${scale})`
    }
    
}

/**
 * @method Title的文本变化，仅限Y轴
 * @param {Number} y 
 * @param {Array} titleList 
 * @param {Node} titleEl 
 * @param {Node} pEl 
 * @param {String} color 
 * @param {Number} bannerHeight 
 */
const titleAnimate = (y, titleList, titleEl,pEl, color, bannerHeight) => {
    let el = titleEl
    let p = pEl
    let arr = titleList
    let len = arr.length
    let height = bannerHeight
    let rgb = color
    // title 颜色改变
    if (y >= 0) {
        el.style.backgroundColor = `rgba(${rgb},0)`
    } else if (y <= -height && y > -height + -50) {
        el.style.backgroundColor = `rgba(${rgb},1)`
    } else if (y <= 0 && y >= -height) {
        el.style.backgroundColor = `rgba(${rgb}, ${y / -height})`
    }
    // title text日期变更
    arr.forEach((val,index,arr) => {
        let lastVal = null
        let _y = Math.abs(y)

        if(len!== 1)lastVal = arr[index - 1] 
        if(!lastVal) return  // 防止事件过快 数据传输不及时
        // 首
        if(_y < arr[0][0]){
            p.innerText = '每日新闻'
        // 尾
        }
        else if(index === len - 1 && _y > lastVal[0] && _y < val[0]){
            p.innerText = lastVal[1]
        // 中间
        }else if(_y > lastVal[0] && _y < val[0]) {
            p.innerText = lastVal[1]
        }
    })
}

export {animate,animateY,bannerAnimate,titleAnimate}