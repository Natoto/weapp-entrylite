// reducers.js
export default {
    myText(state = 'mytext', action) {
        switch (action.type) {
            case 'CHANGE_TEXT':
                return action.text
            default:
                return state
        }
    }
}
