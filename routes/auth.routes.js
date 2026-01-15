const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_key";
const upload = multer();

router.post("/login", upload.none(), async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required",
        })
    }

    // query select user
    const [result] = await db.execute(
        "select kd_user, username, password, nama, hakakses, kdklinik, kdcabang from users where username = ?",
        [username]
    );

    if (!result[0].username) {
        return res.status(400).json({
            message: "Username not found",
        })
    }

    if (!result[0].password) {
        return res.status(400).json({
            message: "password is wrong",
        })
    }

    // compare password 
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) {
        return res.status(400).json({
            message: "password not match",
        })
    }

    // generate token
    const token = jwt.sign(
        {
            kd_user: result[0].kd_user,
            username: result[0].username,
            password: result[0].password,
            nama: result[0].nama,
            hakakses: result[0].hakakses,
            kdklinik: result[0].kdklinik,
            kdcabang: result[0].kdcabang
        },
        JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    res.status(200).json({
        message: "Login success",
        code: 200,
        data: token
    })
});

router.post("/decrypt", async (req, res) => {

    const { encryptData } = req.body;


    if (!encryptData) {
        return res.status(400).json({
            message: "Token is required",
        })
    }

    jwt.verify(encryptData, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Token is invalid",
            })
        }

        res.status(200).json({
            data: decoded
        })
    });

});

module.exports = router;