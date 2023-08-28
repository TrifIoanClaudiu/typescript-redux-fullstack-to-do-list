const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./tokenMiddleware");
const router = require("express").Router();

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json("User has not been found");
      }

      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;