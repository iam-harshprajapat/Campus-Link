const bcrypt = require('bcrypt');

// Generate a hashed password
const plainPassword = '1234';
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(plainPassword, salt);

console.log('Hashed Password:', hashedPassword);
