const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const bcrypt = require("bcrypt");
const upload = multer();

router.get("/", async (req, res) => {

    // insert ke DB
    const [result] = await db.execute(
        "select kd_user, username, password, nama, hakakses, kdklinik, kdcabang from users",
    );

    if (!result || result.length === 0 || result.affectedRows === 0) {
        return res.status(400).json({
            message: "Error get data",
            data: null
        })
    }

    res.status(200).json({
        userData: result
    })
});

router.post("/posts", upload.none(), async (req, res) => {

    const { kd_user, username, nama, hakakses, kdklinik, kdcabang } = req.body;

    let hashpassword = await bcrypt.hash(req.body.password, 10);

    // insert ke DB
    const [result] = await db.execute(
        "insert into users (kd_user, username, password, nama, hakakses, kdklinik, kdcabang) values (?,?,?,?,?,?,?)",
        [kd_user, username, hashpassword, nama, hakakses, kdklinik, kdcabang]
    );

    if (!result || result.length === 0 || result.affectedRows === 0) {
        return res.status(400).json({
            message: "Error insert data",
            data: null
        })
    }

    res.status(201).json("sukses")
});

router.put("/update", upload.none(), async (req, res) => {

    const { username, nama, hakakses, kdklinik, kdcabang } = req.body;

    let hashpassword = await bcrypt.hash(req.body.password, 10);

    // insert ke DB
    const [result] = await db.execute(
        "update users set password = ?, nama = ?, hakakses = ?, kdklinik = ?, kdcabang = ? where username = ?",
        [hashpassword, nama, hakakses, kdklinik, kdcabang, username]
    );

    // affectedRows == 0
    if (result.affectedRows == 0) {
        return res.status(200).json("data not found.")
    }

    if (!result || result.length === 0 || result.affectedRows === 0) {
        return res.status(400).json({
            message: "Error update data",
            data: null
        })
    }

    res.status(200).json("sukses")
});

router.delete("/delete", upload.none(), async (req, res) => {

    const { username } = req.body;

    // insert ke DB
    const [result] = await db.execute(
        "delete from users where username = ?",
        [username]
    );

    // affectedRows == 0
    if (result.affectedRows == 0) {
        return res.status(200).json("data not found.")
    }

    if (!result || result.length === 0 || result.affectedRows === 0) {
        return res.status(400).json({
            message: "Error update data",
            data: null
        })
    }

    res.status(200).json("sukses")
});

module.exports = router;