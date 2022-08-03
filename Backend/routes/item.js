const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser");
const Items = require('../models/Items')
const { body, validationResult } = require('express-validator');


router.get('/fetchallitems', async (req, res) => {
    try {
        const items = await Items.find()
        res.json(items)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occured")
        return
    }
})
router.post('/additems',
    async (req, res) => {
        try {
            const { name, price } = req.body;
            // If error occurs then return bad request
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const items = new items({
                name, price : req.body
            })
            const saveitems = await Item.save()
            res.json(saveitems)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Some Error Occured")
            return
        }

    })


module.exports = router