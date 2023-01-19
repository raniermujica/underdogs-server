const router = require("express").Router();
const uploader = require("../middlewares/cloudinary")

//POST "api/uploader" => Ruta para subir imágenes a la BD
router.post("/", uploader.many("image"), (req, res, next) => {
    if (req.file === undefined) {
        res.status(400).json("Failed to load content")
        return;
    }
    res.status(200).json({image:req.file.path})
});

module.exports = router;