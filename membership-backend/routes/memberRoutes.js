const express = require("express");
const {
  getAllMembers,
  createMember,
} = require("../controllers/memberController");
const authMiddleware = require("../middleware/authMiddleware");

// Multer middleware
const upload = require("../middleware/multerMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllMembers);
router.post("/", authMiddleware, upload.single("photo"), (req, res) => {
  console.log("Received POST request at /api/members");
  console.log("Uploaded file:", req.file);
  console.log("Uploaded file:", req.body);
  createMember(req, res);
});

module.exports = router;
