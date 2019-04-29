const mongoose = require('mongoose')
const User = mongoose.model('User')


async function createUser(data, req) {
    //Cách kiểm tra tenNguoiSuDung đã tồn tại & và thông báo "Tên người dùng đã tồn tại"
    let user = await User.findOne({tenNguoiSuDung: data.tenDangNhap})
    if (user) {
        throw Error('Tên người dùng đã tồn tại')
    }
    user = await User.findOne({email: data.email})
    if (user) {
        throw Error('Email đã tồn tại')
    }
    // let user = new User()
    //apply lấy dữ liệu được chuyển từ dưới client lên server
    let _user = new User()
    _user.tenNguoiSuDung = data.tenDangNhap
    _user.matKhau = data.matKhau
    _user.xacNhanMatKhau = data.xacNhanMatKhau
    _user.email = data.email
    _user.ngayDangKy = Date.now()

    //lưu dữ liệu xuống database 
    _user = await _user.save()
    req.session.email = _user.email
    //trả dữ liệu về cho route 
    return {
        user: user
    }
}

const getListUser = async () => {
    let ListUser = await User.find()
    return {
        ListUser: ListUser
    }
} 

module.exports = {
    createUser,
    getListUser,
}