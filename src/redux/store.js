import { createStore } from 'redux'

const state = {
    date: null,
    topData: [],
    beforeData: [],
    top_stories_id: [],
    stories_id: [],
    pageList: {},
    commentList: {},
    titleList: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_DATE':
            return Object.assign({}, state, { date: action.date })
        case 'GET_TOPDATA':
            return Object.assign({}, state, { topData: action.topData })
        case 'GET_BEFOREDATA':
            return Object.assign({}, state, { beforeData: action.beforeData })
        case 'GET_TOP_STORIES_ID':
            return Object.assign({}, state, { top_stories_id: action.top_stories_id })
        case 'GET_STORIES_ID':
            return Object.assign({}, state, { stories_id: action.stories_id })
        case 'GET_PAGELIST':
            return Object.assign({}, state, { pageList: action.pageList })
        case 'GET_COMMENTLIST':
            return Object.assign({}, state, { commentList: action.commentList })
        case 'GET_TITLELIST':
            state.titleList.push(action.titleList)
            return Object.assign({}, state, { titleList: state.titleList })
        default:
            return state
    }
}
const store = createStore(reducer, state)

store.subscribe(() => {
    console.log(store.getState())
})

export default store