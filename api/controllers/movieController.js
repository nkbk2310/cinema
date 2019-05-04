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

    //lưu dữ liệu xuống database 
    movie = await movie.save()

    //trả dữ liệu về cho route 
    return {
        movie: movie
    }
}

const getListMovie = async () => {
    let ListMovie = await Moive.find().sort({thoiGianTao: -1})
    return {
        ListMovie: ListMovie
    }
} 

async function getMovieDetail (id) {
    let movie = await Movie.findById(id)
    if (!movie){
        throw {errorMessage: 'Không tìm thấy phim'}
    }
    return {
        movie: movie
    }
}

module.exports = {
    createMovie,
    getListMovie,
    getMovieDetail
}