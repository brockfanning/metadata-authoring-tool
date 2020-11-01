const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('upload-page', {
    title: 'SDG Metadata SDMX Converter',
    action: '/convert',
  })
})

module.exports = router
