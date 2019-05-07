const mongoose = require('mongoose')
const User = mongoose.model('User')


async function createUser(data, req) {
    //Cách kiểm tra tenNguoiSuDung đã tồn tại & và thông báo "Tên người dùng đã tồn tại"
    let user = await User.findOne({ email: data.email })
    if (user) {
        throw { errorMessage: 'Email đã tồn tại' }
    }
    // let user = new User()
    //apply lấy dữ liệu được chuyển từ dưới client lên server
    let _user = new User()
    _user.tenNguoiSuDung = data.tenDangNhap
    _user.matKhau = data.matKhau
    _user.email = data.email
    _user.ngayDangKy = Date.now()
    _user.hinhDaiDien = data.hinhDaiDien || ''

    //lưu dữ liệu xuống database 
    _user = await _user.save()
    req.session.email = _user.email
    //trả dữ liệu về cho route 
    return {
        user: _user
    }
}

const getUser = async (email) => {
    let user = await User.findOne({
        email: email
    })
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

const dangNhap = async (user) => {
    let logIn = await User.findOne({ email: user.email })
    if (!logIn) {
        throw { errorMessage: 'Email hoặc mật khẩu không chính xác' }
    }
    if (user.matKhau !== logIn.matKhau) {
        throw { errorMessage: 'Email hoặc mật khẩu không chính xác' }
    }
    return {
        user: logIn
    }
}

// từ email kiếm ra thằng user để chỉnh sửa
const editProfile = async (email, data) => {
    let user = await User.findOne({ email: email })
    if (!user) {
        throw { errorMessage: 'Email không tồn tại' }
    }
    //đưa dữ liệu từ dưới client lên server
    user.tenNguoiSuDung = data.tenNguoiSuDung
    user.matKhau = data.matKhau
    let checkEmailUser = await User.findOne({ email: data.email })
    if (checkEmailUser) {
        if (checkEmailUser.id !== user.id) {
            throw { errorMessage: 'Email đã tồn tại'}
        }
    } else {
        user.email = data.email
    }
    user.ngayDangKy = Date.now()
    user.hinhDaiDien = data.hinhDaiDien || ''

    user = await user.save()
    //trả dữ liệu về cho route 
    return {
        user: user

    }
}



module.exports = {
    createUser,
    getListUser,
    dangNhap,
    getUser,
    editProfile,
}