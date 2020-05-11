const path = require('path')
const express = require('express')
const multer = require('multer')
const { WordTemplateInput, SdmxOutput } = require('sdg-metadata-convert')
const router = express.Router()

const upload = multer({
    dest: 'user_uploads/'
})

router.get('/', function(req, res, next) {
    res.send('respond with a resource')
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const indicator = req.file
        if (!indicator) {
            res.status(400).send({
                status: false,
                data: 'No indicators were sent',
            })
        }
        else {
            const input = new WordTemplateInput()
            const output = new SdmxOutput()
            const outputFile = path.join('user_uploads', indicator.filename + '.xml')
            input.read(indicator.path)
                .then(metadata => output.write(metadata, outputFile))
                //.then(() => res.download(outputFile))
                .then(() => res.send({
                    status: true,
                    message: 'Indicator successfully converted.',
                    data: {
                        filePath: outputFile,
                        downloadName: convertFilename(indicator.originalname)
                    }
                }))
                .catch(err => res.status(500).send(err))
        }
    }
    catch(err) {
        res.status(500).send(err)
    }
})

function convertFilename(filename) {
    return path.basename(filename, '.docx') + '.xml'
}

module.exports = router
