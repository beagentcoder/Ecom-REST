import CartModel from "./cart.model.js";
export default class CartController{
    addToCart(req,res){
        const {productId,quantity}= req.query;
        const userId= parseFloat(req.userId)
        CartModel.add(productId,userId,quantity)
        res.status(201).send({msg:`Cart is updated for user ${userId}`})

    }

    getCart(req,res){
        const userId= parseFloat(req.userId)
        const items =CartModel.getCart(userId)
        
        res.status(200).send(items)
        

    }

    deleteItem(req,res){
        const userId= parseFloat(req.userId)
        const {productId}= req.query;
        const result= CartModel.deleteItem(productId,userId)
        if(result)
            res.status(200).send({msg:`Item with Product id ${productId} is deleted from cart for user ${userId}`})
        else
        res.status(404).send({msg:`Item with id Product ${productId} not found in cart for user ${userId}`})
    }
}