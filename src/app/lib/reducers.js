import { actions } from './action'

const { ADD_TO_CART, SAVE_CART, UPDATE_CART, REMOVE_FROM_CART, RESET_CART } = actions

const saveToLocalstorage = object => {
    localStorage.setItem("items", JSON.stringify(object));
}
const initialState = {
    items: JSON.parse(localStorage.getItem("items")) !== null ?
        JSON.parse(localStorage.getItem("items")) : []
}

export default function onlineStoreApp(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return Object.assign({}, state, { items: [...state.items, action.payload] });
        case UPDATE_CART:
            return Object.assign({}, state, {
                items: state.items.map(item => {
                    return item.id === action.payload.id ?
                        Object.assign({}, item, {
                            quantity: action.payload.quantity
                        }) : item;
                })
            })
        case REMOVE_FROM_CART:
            return Object.assign({}, state, {
                items: state.items.filter(item => {
                    return item.id !== action.payload
                })
            })
        case SAVE_CART:
            saveToLocalstorage(action.payload.items);
            return state
        case RESET_CART:
            saveToLocalstorage([])
            return Object.assign({}, state, {
                items: []
            })
        default:
            return state;
    }
}