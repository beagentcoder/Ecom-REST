export default class CartModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.id = id;
  }
  static add(productId, userId, quantity) {
    productId=parseFloat(productId)
    quantity=parseFloat(quantity)
    let cartItem = cartItems.find(
      (item) => item.productId == productId && item.userId == userId
    );
    if (cartItem) {
      cartItem.quantity = quantity;
      return cartItem;
    } else {
      const cartItem = new CartModel(productId, userId, quantity);
      cartItem.id = cartItems.length + 1;
      cartItems.push(cartItem);
      return cartItem;
    }
  }
  static getCart(userId) {
    const cartItem = cartItems.filter((item) => item.userId === userId);
    return cartItem;
  }
  static deleteItem(productId, userId) {
    productId=parseFloat(productId)
    const index = cartItems.findIndex(
      (item) => item.productId === productId && item.userId === userId
    );
    
    if(index){
        cartItems.splice(index, 1);
      return true;
    }
    else
      return false;
  }
}

var cartItems = [new CartModel(1, 2, 1, 1), new CartModel(3, 1, 5, 1)];
