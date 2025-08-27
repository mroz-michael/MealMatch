// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller

const createUser = async (req, res) => {
    //todo:  hash pw, save user to db, handle errors
    console.log("Will create user when this is called");
}

//use for log ins
const getUser = async (req, res) => {
    //todo  unhash pw, get user from db, handle errors
    console.log("will get the user")
}

const deleteUser = async (req, res) => {
    //todo: del user, handle errors
    console.log("will delete user when called");
}

const updateUser = async(req, res) => {
    console.log("will update user when called");
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}