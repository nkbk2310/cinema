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
        default: '',
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