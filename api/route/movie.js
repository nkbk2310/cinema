const express = require ('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

router.post('/', async function(req,res){
    try {
        // if (!req.session.email) {
        //     throw Error ({message:'Bạn chưa đăng nhập'})
        // }
        //gọi hàm tạo phim trong movieController để trả về data cho biến response
        let response = await movieController.createMovie(req.body)
        //trả data response về cho client
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/', async function(req,res){
    try {
        let response = await movieController.getListMovie(req.body)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/:id', async function(req,res){
    try {
        let response = await movieController.getMovieDetail(req.params.id)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
// gọi hàm chỉnh sửa trong movieController để trả về data
router.put('/:id', async function(req,res){
    try {
        let response = await movieController.delMovie(req.body)
        //trả data response về cho client
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.delete('/:id', async function(req,res){
    try {
        let response = await movieController.delMovie(req.params.id)
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router