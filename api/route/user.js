const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/dang-xuat', async function(req,res){
    try {
        req.session.email = undefined
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/:email', async function(req,res){
    try {
        let response = await userController.getUser(req.params.email)
        res.send(response)
    } catch (error) {
        console.log(error)
        
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


router.put('/:email', async function(req,res){
    try {
        let response = await userController.editProfile(req.params.email, req.body)
        //trả data response về cho client
        req.session.email = response.user.email
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


router.post('/', async function(req,res){
    try {
        //gọi hàm tạo phim trong userController để trả về data cho biến response
        let response = await userController.createUser(req.body, req)
        //trả data response về cho client
        res.send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.post('/dang-nhap', async function(req,res){
    try {
        let response = await userController.dangNhap(req.body)
        req.session.email = response.user.email
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router