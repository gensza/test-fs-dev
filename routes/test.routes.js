const express = require("express");
const router = express.Router();

router.get("/no-4-array", async (req, res) => {

    const array1 = [2, 5, 8, 9]
    const array2 = [1, 2, 3, 4, 5, 6, 7]
    const array3 = []

    // menampilkan array yang tidak ada di array 1
    array2.forEach(element => {
        if (!array1.includes(element)) {
            array3.push(element)
        }
    });

    res.status(200).json({
        result: array3
    })
});

router.get("/no-5-string", async (req, res) => {

    const StringRandom = "PT.AbadI* perKASa@BeRsAmA-DIGItAL#SolUTiONs"

    let string_clean = StringRandom.replace(/[^a-zA-Z0-9]/g, " ");

    // trim
    string_clean = string_clean.replace(/\s+/g, " ").trim();

    // uppercase
    string_clean = string_clean.toUpperCase();

    res.status(200).json({
        result: string_clean
    })
});

router.get("/no-6-terbilang", async (req, res) => {

    // merubah angka menjadi terbilang
    const angka = 1200;

    const huruf = [
        "",
        "satu",
        "dua",
        "tiga",
        "empat",
        "lima",
        "enam",
        "tujuh",
        "delapan",
        "sembilan",
        "sepuluh",
        "sebelas",
    ];

    if (angka < 12) {
        result = huruf[angka];
    } else if (angka < 20) {
        result = huruf[angka - 10] + " belas";
    } else if (angka < 100) {
        result = huruf[Math.floor(angka / 10)] + " puluh " + huruf[angka % 10];
    } else if (angka < 200) {
        result = "seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        result = huruf[Math.floor(angka / 100)] + " ratus " + terbilang(angka % 100);
    } else if (angka < 2000) {
        result = "seribu " + terbilang(angka - 1000);
    }

    res.status(200).json({
        result: result
    })
});

module.exports = router;