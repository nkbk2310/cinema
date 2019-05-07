const mongoose = require('mongoose')
const Moive = mongoose.model('Movie')

// tạo ra phim(movie) bằng data
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
    let ListMovie = await Moive.find().sort({ thoiGianTao: -1 })
    return {
        ListMovie: ListMovie
    }
}

// từ cái id kiếm ra phim(movie) rồi gởi cho người dùng
const getMovieDetail = async function (id) {
    let movie = await Moive.findById(id)
    if (!movie) {
        throw { errorMessage: 'Không tìm thấy phim' }
    }
    return {
        movie: movie
    }
}

// viết hàm chỉnh sửa
// từ cái id kiếm ra phim(movie) để chỉnh sửa (data)
const editMovie = async function (id, data) { 
    let movie = await Moive.findById(id)
    if (!movie) {
        throw { errorMessage: 'Không tìm thấy phim' }
    }
    //đưa dữ liệu từ dưới client lên server
    movie.tenPhim = data.tenPhim
    movie.theLoai = data.theLoai
    movie.thoiGianPhatHanh = data.thoiGianPhatHanh
    movie.moTa = data.moTa
    movie.hinhMinhHoa = data.hinhMinhHoa || ''

    //lưu dữ liệu xuống database 
    movie = await movie.save()

    return {
        movie: movie
    }
}

//từ cái id kiếm ra phim(movie) để xoá(delete)
const delMovie = async function (id) {
    let movie = await Moive.findById(id)
    if (!movie) {
        throw { errorMessage: 'Không tìm thấy phim'}
    }
    await Moive.deleteOne({_id: movie._id})
    return { errorMessage: 'Xoá phim thành công'}
}

module.exports = {
    createMovie,
    getListMovie,
    getMovieDetail,
    editMovie,
    delMovie
}