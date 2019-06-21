import store from '../redux/store'
import Axios from 'axios'


const getTopData = () => {
    // let news = '/news/latest'
    let news = 'https://www.easy-mock.com/mock/5d0bc7f4fbb61819f947c795/zhihu/proxy/latest'
    let dispatch = store.dispatch
    return Axios.get(news)
        .then((res) => {
            let date = res.data.date
            let topData = res.data
            let top_stories = topData.top_stories
            let stories = topData.stories
            let top_stories_id = []
            let stories_id = []
            top_stories.forEach(val => {
                return top_stories_id.push(val.id)
            })
            stories.forEach(val => {
                return stories_id.push(val.id)
            })
            // 时间    date
            dispatch({
                type: 'GET_DATE',
                date: date
            })
            // 今日新闻 top_data
            dispatch({
                type: 'GET_TOPDATA',
                topData: topData
            })
            // id top_stories_id
            dispatch({
                type: 'GET_TOP_STORIES_ID',
                top_stories_id: store.getState().top_stories_id.concat(top_stories_id)
            })
            // id stories_id 
            dispatch({
                type: 'GET_STORIES_ID',
                stories_id: store.getState().stories_id.concat(stories_id)
            })
        })
        .then(() => {
            getBeforeData()
        })
}
const getBeforeData = () => {
    let dispatch = store.dispatch
    let date = store.getState().date
    // let latest = '/news/before/' + date
    let latest = 'https://www.easy-mock.com/mock/5d0bc7f4fbb61819f947c795/zhihu/proxy/before/' + date
    
    return Axios.get(latest)
        .then((res) => {
            let date = res.data.date
            let beforeData = res.data
            let stories = res.data.stories
            let stories_id = stories.map(val => {
                return val.id
            })
            // 时间
            dispatch({
                type: 'GET_DATE',
                date: date
            })
            // 往日新闻
            dispatch({
                type: 'GET_BEFOREDATA',
                beforeData: store.getState().beforeData.concat(beforeData)
            })
            // stories_id
            dispatch({
                type: 'GET_STORIES_ID',
                stories_id: store.getState().stories_id.concat(stories_id)
            })
        })
}

const getNewsData = (id, fn) => {
    // let news = '/news/' + id
    let news = 'https://www.easy-mock.com/mock/5d0bc7f4fbb61819f947c795/zhihu/proxy/news/' + id
    let pageList = store.getState().pageList
    let dispatch = store.dispatch
    if (pageList[id]) {
        fn(pageList[id])
    } else {
        return Axios.get(news)
            .then((res) => {
                dispatch({
                    type: 'GET_PAAGELIST',
                    pageList: Object.assign(pageList, { [id]: res })
                })
                fn(res)
            })
    }
}

const getCommentData = (id, fn) => {
    // let long_comments = '/story/' + id + '/long-comments'
    // let short_comments = '/story/' + id + '/short-comments'
    let long_comments = 'https://www.easy-mock.com/mock/5d0bc7f4fbb61819f947c795/zhihu/proxy/long-comments/' + id
    let short_comments = 'https://www.easy-mock.com/mock/5d0bc7f4fbb61819f947c795/zhihu/proxy/short-comments/' + id
    let commentList = store.getState().commentList
    let dispatch = store.dispatch

    if (commentList[id]) {
        fn(commentList[id])
    } else {
        return Axios.all([Axios.get(long_comments), Axios.get(short_comments)])
            .then(Axios.spread((acct, perms) => {
                dispatch({
                    type: 'GET_COMMENTLIST',
                    commentList: Object.assign(commentList, {
                        [id]: {
                            longComment: acct.data,
                            shortComment: perms.data
                        }
                    })
                })
                fn({
                    longComment: acct.data,
                    shortComment: perms.data
                })
            }))
    }


}
// const getLongComment = (id, fn) => {
//     let story = '/story/' + id + '/long-comments'
//     return Axios.get(story)
//         .then(fn)
// }

// const getShortComment = (id, fn) => {
//     let story = '/story/' + id + '/short-comments'
//     return Axios.get(story)
//         .then(fn)
// }
export { getTopData, getBeforeData, getNewsData, getCommentData }