import type {CartItem} from "~/types";

/**
 * Vue Composition API style
 * ref() => state
 * computed() => getter
 * function() => actions
 */
export const useCartStore = defineStore('cart', () => {
    //state
    const cart: Array<CartItem> = reactive([])

    //getter
    const getCartQuantity = computed(() => {
        return cart
            .map(i => i.quantity)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    })
    const getSortedCart = computed(() => {
        // @ts-ignore
        return cart.sort((a,b) => a.id - b.id)
    })

    //action
    function findCartItem(id: number | string) {
        const itemIdx = cart.map(i => i.id).findIndex((e) => e == id)
        const item = cart[itemIdx]
        return { item, itemIdx }
    }
    function ADD_TO_CART(item: CartItem, quantity: number = 1) {
        const { item: foundItem, itemIdx: foundIdx } = findCartItem(item.id)
        if(foundItem) {
            cart[foundIdx].quantity+=quantity
        } else {
            cart.push({...item, quantity})
        }
    }

    return {cart, getCartQuantity, getSortedCart, ADD_TO_CART}
})