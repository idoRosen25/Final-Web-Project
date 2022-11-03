const bcrypt = require("bcrypt");
const saltRounds = 10;

async function genHash(password) {
  const hashedPass = bcrypt.hash(password, saltRounds).then((hash) => {
    return hash;
  });

  return await hashedPass;
}
async function compareHash(password, hash) {
  const compare = bcrypt.compare(password, hash).then((res) => {
    return res;
  });
  return compare;
}
module.exports = { genHash, compareHash };
