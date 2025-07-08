const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/User")

const jwtSecret = "srisrisrivarahadevasambhutavarahideviainamaha"


router.post("/createuser",
    body('email').isEmail(),
    body('password', "Invalid Password").isLength({ min: 6 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPasssword = await bcrypt.hash(req.body.password,salt)
        try {
            user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPasssword

            })
            

            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }
    })

router.post("/loginuser", body('email').isEmail(),
    body('password', "Invalid Password").isLength({ min: 6 })
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        let email = req.body.email;

        try {
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "invalid credentials" });

            }
            const pwdcompare = await bcrypt.compare(req.body.password ,userData.password)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "invalid credentials" });
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true ,authToken:authToken});


        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }
    })
module.exports = router;