const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser");
const Order = require('../models/Orders')
const { body, validationResult } = require('express-validator');


//ROUTE:1 Get All Notes using GET: api/notes/fetchallnotes
router.get('/fetchallorders', fetchuser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.json(orders)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
        return
    }
})

//ROUTE:2 Add notes using POST: api/notes/addnote
router.post('/addorder', fetchuser,
    [
        body('name', 'Enter valid name'),
        body('price', 'Enter valid price '),
        body('quantity', 'Enter valid quantity '),
        body('status', 'Enter valid status ')
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // If error occurs then return bad request
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
            // res.send(note)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error Occured")
            return
        }

    })

module.exports = router