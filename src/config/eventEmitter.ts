import mitt from 'mitt'


export const EMITKEYS ={
    item_added_to_cart:"item_added_to_cart"
}

const emitter = mitt<any>()
export const Emitter = emitter
