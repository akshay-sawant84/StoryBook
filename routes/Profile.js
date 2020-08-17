const express = require('express')
const router = express.Router()
const Content = require("../models/Content");
const { ensureAuth } = require("../helper/authHelper");

router.get('/profile',ensureAuth,(req,res) => {
    Content.find({ user : req.user._id })
    .then ((content) => {
        res.render("profile/profile", {
            content
        });
    })
})


module.exports = router