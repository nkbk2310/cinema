const mongoose = require('mongoose')
const User = mongoose.model('User')


async function createUser(data, req) {
    //Cách kiểm tra tenNguoiSuDung đã tồn tại & và thông báo "Tên người dùng đã tồn tại"
    let user = await User.findOne({tenNguoiSuDung: data.tenDangNhap})
    if (user) {
        throw {errorMessage:'Tên người dùng đã tồn tại'}
    }
    user = await User.findOne({email: data.email})
    if (user) {
        throw {errorMessage:'Email đã tồn tại'}
    }
    // let user = new User()
    //apply lấy dữ liệu được chuyển từ dưới client lên server
    let _user = new User()
    _user.tenNguoiSuDung = data.tenDangNhap
    _user.matKhau = data.matKhau
    _user.email = data.email
    _user.ngayDangKy = Date.now()

    //lưu dữ liệu xuống database 
    _user = await _user.save()
    req.session.email = _user.email
    //trả dữ liệu về cho route 
    return {
        user: _user
    }
}

const getListUser = async () => {
    let ListUser = await User.find()
    return {
        ListUser: ListUser
    }
} 

const dangNhap = async (user) => {
    let logIn = await User.findOne({email: user.email})
    if (!logIn) {
        throw {errorMessage:'Email hoặc mật khẩu không chính xác'}
    }
    if (user.matKhau !== logIn.matKhau) {
        throw {errorMessage:'Email hoặc mật khẩu không chính xác'}
    }
    return {
        user: logIn
    }
} 



module.exports = {
    createUser,
    getListUser,
    dangNhap,
}