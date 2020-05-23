const userTable = require('./connection_to_database/connectToUserDatabase')

module.exports = {

  async getAllUsers() {
    var result = await userTable.getAllUsers();
    return result
  },

  async login(Phone, Password) {

    result = await userTable.findUserByPhone(Phone)

    if (result.length !== 0){
      var result = await userTable.findUserByPhoneAndPassword(Phone, Password);
      return result
    }else{
      return JSON.stringify("This phone doesn't have any account")
    }
  },

  async signup(Phone, Password) {

    result = await userTable.findUserByPhone(Phone)

    if (result.length === 0) {
      await userTable.insertUser(Phone, Password)
      return JSON.stringify(true)
    }else{
      return JSON.stringify(false)
    }

  },

  async getInfoUser(Phone) {
    result = await userTable.findUserByPhone(Phone)
    return result
  },

  async updateInforUser(OldPhone, Phone, Username, Address){

    var result = []
    if (OldPhone !== Phone){
      result = await userTable.findUserByPhone(Phone)
    }
    
    if (result.length !== 0) {
      return JSON.stringify("New phone number has already been registed for another account")
    }else{
      result = await userTable.updateInforUser(OldPhone, Phone, Username, Address)
      return true
    }
  }
};
