const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

const uploaderRoutes = require("./upload.routes")
router.use("/upload", uploaderRoutes)

module.exports = router;
