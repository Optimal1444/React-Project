import { createStore } from "redux"

const reducer=(state=0,action)=>{
    console.log('aaa:'+action.type)
    if(action.type=='registerd')
        return 1
    else
        return 0
}

export const Store=createStore(reducer)