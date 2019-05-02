const mongoose = require('mongoose')
const Moive = mongoose.model('Movie')


const createMovie = async (data) => {
    let movie = new Moive()
    //đưa dữ liệu từ dưới client lên server
    movie.tenPhim = data.tenPhim
    movie.theLoai = data.theLoai
    movie.thoiGianPhatHanh = data.thoiGianPhatHanh
    movie.moTa = data.moTa
    movie.hinhMinhHoa = data.hinhMinhHoa || ''
    movie.thoiGianTao = data.thoiGianTao

    //lưu dữ liệu xuống database 
    movie = await movie.save()

    //trả dữ liệu về cho route 
    return {
        movie: movie
    }
}

const getListMovie = async () => {
    let ListMovie = await Moive.find().sort({thoiGianTao:-1})
    return {
        ListMovie: ListMovie
    }
} 

module.exports = {
    createMovie,
    getListMovie,
}