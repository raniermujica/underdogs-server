const router = require("express").Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/auth.middlewares");

//GET "/api/profile/my-profile" => Ruta para visualizar el perfil del usuario
router.get("/my-profile", isAuthenticated, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id)//.populate("favorites")
        console.log(response)
        res.status(200).json(response)
    } catch(error) {
        next(error)
    }
});

//PATCH "/api/profile/edit" => Ruta para editar el perfil del usuario
router.patch("/edit", isAuthenticated, async (req, res, next) => {
    
    const { firstName, lastName, email, password, address, apartment, city, zipCode, phone, addressDetails } = req.body;
    
    const userUpdate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        apartment: apartment,
        city: city,
        zipCode: zipCode,
        phone: phone,
        addressDetails: addressDetails
    };

    try {
        const response = await User.findByIdAndUpdate(req.payload._id, userUpdate)
        console.log(response)
        res.status(200).json(response)
    } catch(error) {
        next(error)
    }
});

module.exports = router;