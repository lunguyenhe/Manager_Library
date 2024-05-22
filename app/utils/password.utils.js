const crypto = require('crypto');

function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');

    return {
        salt: salt,
        hash: hash.toString('hex'), // Chuyển buffer thành chuỗi hex
        iterations: iterations
    };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    var hash = crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha512');
    return savedHash === hash.toString('hex');
}
module.exports = {
    hashPassword: hashPassword
};