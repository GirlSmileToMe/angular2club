const crypto=require('crypto');
//对密码进行hash
exports.hashPW=function(pass){
    return crypto.createHash('sha256').update(pass).digest('base64').toString();
};