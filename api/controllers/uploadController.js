const path = require('path')


const uploadHinh = async (hinh) => {
    let date = Date.now()
    let url = path.join(path.join(__dirname, '../../'), 'public/images/upload/');
    let imgType = hinh.name.slice(hinh.name.lastIndexOf('.'),hinh.name.length)
    var fileName = date + imgType

    hinh.mv(url + fileName, function (err) {
        if (err){
            throw {errorMessage: 'Không tải hình lên được, vui lòng thử lại'}
        }
    });
    return {fileName: fileName}
}




module.exports = {
    uploadHinh,
}