const CartService = {}

CartService.getCart = async () => {
    let res = await fetch('/cart')
    return res
}

CartService.updateCart = async (cart) => {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: cart})
    }
    let res = await fetch('/cart/update', req)
    return res
}

export default CartService