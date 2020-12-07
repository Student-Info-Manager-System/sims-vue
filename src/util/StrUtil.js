import $C from "./Config";
import { Dialog } from 'vant';


let log = (msg) =>{
    Dialog.alert({
        title: "提示",
        message: msg,
      });
}

let isNull = str => (str === '' || str === ' ' || str === null || str === 'undefined' || typeof str === 'undefined' || str.length === 0) 

let isEmpty = obj => {
    for (let i in obj){
        if (isNull(obj[i])) return true
    } return false
}

let hasNull = (...vars) => {
    for (let i in vars) {
        if (isNull(vars[i])) return true
    } return false
}


let isT = (str) => equal(str, $C.T)
let isS = (str) => equal(str, $C.S)


let equal = (v1, v2) => v1 === v2

export default {
    isNull, isT, isS, isEmpty, hasNull, log, equal,
    components: {
        [Dialog.name]: Dialog,
    },
}
