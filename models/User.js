const mongoose = require('mongoose')
let Schema = mongoose.Schema
var UserSchema = new Schema({
    tenNguoiSuDung: {
        type: String,
        default: ''
    },
    matKhau: {
        type: String,
        default: ''
    },
    xacNhanMatKhau: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
    },
    ngayNgayDang: {
        type: Number,
        default: 0,
    },
    hinhDaiDien: {
        type: String,
        default: ''
    }
})
module.exports = mongoose.model('User', UserSchema)