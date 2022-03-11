const router = require("express").Router();
const fs = require("fs");

router.get("/image/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    fs.stat(`app/image/${imageName}`, (err) => {
        if (!err) {
            const readStream = fs.createReadStream(`app/image/${imageName}`);
            readStream.pipe(res);
        } else {
            return res.status(404).send({ message: "Image not found." });
        }
    });
});

module.exports = router;