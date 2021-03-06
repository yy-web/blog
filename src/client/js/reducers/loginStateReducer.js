import {ISLOGIN,ISLOGOUT} from '../constant/actionsType'

const initialState = {
    user:'',
    icon:''
}
const loginStateReducer = (state = initialState,action) =>{
    switch (action.type){
        case ISLOGOUT:
            return Object.assign({},state,{user:action.user}
            )
        case ISLOGIN:
            return Object.assign({},state,{user:action.user,icon:action.icon}
            )
        default: return state
    }
}
export default loginStateReducer
