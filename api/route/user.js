const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', async function(req,res){
    try {
        //gọi hàm tạo phim trong movieController để trả về data cho biến response
        let response = await userController.createUser(req.body, req)
        //trả data response về cho client
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

router.get('/', async function(req,res){
    try {
        let response = await userController.getListUser(req.body)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router