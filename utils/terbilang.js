function terbilang(angka) {
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
        return huruf[angka];
    } else if (angka < 20) {
        return huruf[angka - 10] + " belas";
    } else if (angka < 100) {
        return (
            huruf[Math.floor(angka / 10)] +
            " puluh " +
            terbilang(angka % 10)
        ).trim();
    } else if (angka < 200) {
        return "seratus " + terbilang(angka - 100);
    } else if (angka < 1000) {
        return (
            huruf[Math.floor(angka / 100)] +
            " ratus " +
            terbilang(angka % 100)
        ).trim();
    } else if (angka < 2000) {
        return "seribu " + terbilang(angka - 1000);
    } else if (angka < 1000000) {
        return (
            terbilang(Math.floor(angka / 1000)) +
            " ribu " +
            terbilang(angka % 1000)
        ).trim();
    } else {
        return "angka terlalu besar";
    }
}

module.exports = terbilang;