const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares");

//POST "api/auth/signup" --- Ruta para registrar usuario
router.post("/signup", async (req, res, next) => {
    console.log(req.body)
    const { firstName, lastName, email, password } = req.body
    
    if(!email || !password || !firstName || !lastName) {
        res.status(400).json({errorMessage: "Debe completar todos los campos"})
        return;
    }
    // Al menos 8 caracteres, 1 número, 1 mayúscula y 1 signo
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRegex.test(password) === false) {
      res.status(400).json({errorMessage: "Invalid password"});
      return;
    }

    const mailRegex = /[\w|.|-]*@\w*\.[\w|.]*/g;
    if (mailRegex.test(email) === false) {
    res.status(400).json({errorMessage: "Invalid email"})
    return;
    }
    
try {
    const foundUser = await User.findOne({ email: email})
    if (foundUser !== null) {
        res.status(302).json({ errorMessage: "El email ya pertenece a una cuenta registrada"})
        return;
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword
    }

    await User.create(newUser)

    res.status(201).json("Usuario registrado")

} catch (error) {
    next(error)
}
})

//POST "/api/auth/login" --- Ruta para validar credenciales del usuario
router.post("/login", async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Debe completar todos los campos"})
        return;
    }

    try {
        
        const foundUser = await User.findOne({ email: email})
        console.log(foundUser)

        if (foundUser === null) {
            res.status(400).json({errorMessage: "Credenciales no válidas"})
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        if (isPasswordValid === false) {
            res.status(400).json({errorMessage: "Credenciales no válidas"})
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            firstname: foundUser.firstName,
            lastname: foundUser.lastName,
            role: foundUser.role,
            address: foundUser.address,
            apartment: foundUser.apartment,
            city: foundUser.city,
            zipCode: foundUser.zipCode,
            phone: foundUser.phone,
            addressDetails: foundUser.adressDetails
        }

        const authToken = jwt.sign(
            payload, 
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "4h" }
        )


        res.status(200).json({ authToken: authToken })

    } catch(error) {
        next(error)
    }
})

//GET "/api/auth/verify" --- Ruta para la verificación del usuario
router.get("/verify", isAuthenticated, (req, res, next) => {
    console.log(req.payload)
    res.status(200).json("Token válido")
})


module.exports = router;