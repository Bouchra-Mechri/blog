const router = require("express").Router();
const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController");
const{ verifyTokenAndAdmin } = require("../middlewares/verifyToken"); //n7b admin ken howa y3wml create 
const validateObjectId = require("../middlewares/validateObjectId");

// /api/categories

router.route("/")
.post(verifyTokenAndAdmin , createCategoryCtrl)
.get(getAllCategoriesCtrl);



// /api/categories/:id
router.route("/:id").delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;