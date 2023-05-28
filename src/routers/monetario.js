const express = require('express')
const calcula = require('../utils/conversor')
const router = express.Router()

router.get('/monetario', (req, res) => {
    
    res.send({Value: "Teste"})
})

module.exports = router