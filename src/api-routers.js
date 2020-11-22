const router = require("express").Router();
const usersRouter = require("./users/users-router");
const laptopsRouter = require("./laptops/laptop-router");
const activitiesRouter = require("./activities/activities-router");
const contactRouter = require("./contact/contact-router");

router.use("/users", usersRouter);
router.use("/laptops", laptopsRouter);
router.use("/activities", activitiesRouter);
router.use("/contact", contactRouter);

module.exports = router;
