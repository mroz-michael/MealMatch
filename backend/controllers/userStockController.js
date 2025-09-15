//controller for User's stock array of ingredients
const service = require('../services/stockService')

const getStock = async (req, res) => {
    
    try {

        const userId = req.user.id;
        const userStock = await service.getStock(userId);
        res.status(200).json(userStock);

    } catch (err) {
        return res.status(400).json({error: err.message})
    }
}

//TODO next: finish implementing these functions

const addToStock = async (req, res) => {


}

const updatePortions = async (req, res) => {

}

const updateMetadata = async(req, res) => {

}

const removeFromStock = async (req, res) => {
    
}

module.exports = {
    getStock,
    addToStock,
    updatePortions,
    updateMetadata,
    removeFromStock
}