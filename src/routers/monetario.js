const express = require('express')
const calcula = require('../utils/conversor')
const calcular = require('../utils/conversor')
const router = express.Router()

router.get('/monetario', (req, res) => {
    
    res.send({Value: calcular(req.body.valor)})
})

module.exports = router