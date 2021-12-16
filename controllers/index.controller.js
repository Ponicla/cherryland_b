const test = async (req, res) => {
    var nombre = 'posberry';
    res.json(
        `SERVICIO ${nombre.toUpperCase()} ALTA CORRECTA`
    )
}

module.exports = { test }