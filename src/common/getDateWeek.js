
/**
 * @method  输入日期导出为'某月某日星期几'
 * @param   {String} date '20190901'
 */
const getDateWeek = (date)=>{
    let year = date.slice(0, 4)
    let month = date.slice(4, 6) 
    let day = date.slice(6, 8)
    let weekDate = new Date(year, month, day).toString().slice(0, 3)
    let week = getWeekDay(weekDate)
    let days = month + '月' + day + '日 ' + week
    return days
}

const getWeekDay = (week)=>{
    let week_ehg = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let week_cn = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    for (let i = 0; i < week_ehg.length; i++) {
        if (week_ehg[i] === week) {
            return week_cn[i]
        }
    }
}

export default getDateWeek