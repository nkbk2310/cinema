const mongoose = require('mongoose')
let Schema = mongoose.Schema
let MovieSchema = new Schema ({
    tenPhim: {
        type: String,
        default: ''
    },
    theLoai: {
        type: String,
        default: '',
    },
    thoiGianPhatHanh: {
        type: Number,
        default: 0
    },
    moTa: {
        type: String,
        default: '',
    },
    hinhMinhHoa: {
        type: String,
        default: 'https://ae01.alicdn.com/kf/HTB1gfbapy0TMKJjSZFNq6y_1FXah/Star-Wars-The-Last-Jedi-Movie-Poster-Episode-VIII-2017-Film-Art-Silk-Fabric-Poster-36.jpg',
    },
    thoiGianTao: {
        type: Number,
        default: Date.now,
    },
    thoiGianChinhSua: {
        type: Number,
        default: Date.now,
    },
    maPhim: {
        type: String,
        default: ''
    }
})
module.exports = mongoose.model('Movie', MovieSchema)