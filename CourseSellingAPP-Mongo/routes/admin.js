const {Router} = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

router.post("/signup", (req, res) => {
	// admin signup logic
});

router.post("/courses", adminMiddleware, (req, res) => {
	// implement course creation logic
});

router.get("/courses", adminMiddleware, (req, res) => {
	// implement fetching all courses logic
});

module.exports = router;
