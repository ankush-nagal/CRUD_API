const express = require("express")
const router = express.Router();
const User = require("../models/user")
const userSchema = require("../validiation")



router.post("/", async (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    const result = await User.create(value);
    return res.status(201).json({ msg: "success", data: result });
});


router.get("/html", async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
});

router.get("/", async (req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
});



router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
})

router.patch("/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "success" });
})

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
})

module.exports = router;