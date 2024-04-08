function otpGenerator() {
    let code = "";
    for (let i = 0; i < 6; i++) {
      let pos = Math.floor(Math.random() * 10);
      code += pos;
    }
    return code;
  }

 export default otpGenerator 