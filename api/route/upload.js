const express = require ('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')
const expressUpload = require('express-fileupload')

router.post('/', expressUpload(), async function(req,res){
    try {
        if (!req.files.hinh){
            throw {errorMessage: 'Không tìm thấy hình'}
        }
        let response = await uploadController.uploadHinh(req.files.hinh)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router