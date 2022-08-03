const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser");
const Cart = require('../models/Cart')
const Itemss = require('../models/Items')
const { body, validationResult } = require('express-validator');


//ROUTE:1 Get All Notes using GET: api/notes/fetchallnotes
router.get('/fetchallcartitems', fetchuser, async (req, res) => {
    try {
        // let Carts;
        let Items = [];
        let Item = [{
            name: '',
            quantity: '',
        }];
        const Carts = await Cart.find({ user: req.user.id })
        for (let i = 0; i < Carts.length; i++) {
            Items[i] = await Itemss.find({ _id: Carts[i].item_id })
            Item[0].quantity = await Cart.find({ user: req.user.id }, { "quantity": 1 })
        }
        const cart_count = await Cart.find({ user: req.user.id }).countDocuments()
        res.json({ Carts, cart_count, Item, Items })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
        return
    }
})

router.post('/addtocart', fetchuser,
    [
        body('quantity', 'Enter valid quantity '),
    ],
    async (req, res) => {
        try {
            const { item_id, quantity } = req.body;
            // If error occurs then return bad request
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const cart = new Cart({
                quantity: req.body.quantity,
                item_id: req.body.item_id,
                user: req.user.id
            })
            const saveCart = await cart.save()
            res.json(saveCart)
            // res.send(note)

        } catch (error) {
            console.error(error)
            res.status(500).send("Some Error Occured")
            return
        }

    })

router.delete('/deletecart/:id', fetchuser, async (req, res) => {
    try {


        // Find thee cart to be deleted
        let cart = await Cart.findById(req.params.id)
        if (!cart) { return res.status(404).send("Not Found") }

        if (cart.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        cart = await Cart.findByIdAndDelete(req.params.id)
        res.json({ "success": "Deleted successfully", cart: cart })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
        return
    }
})


module.exports = router