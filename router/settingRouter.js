import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
const router = express.Router();

//Parent settings

router.patch("/profile", (req, res) => {
  const type = req.body.type === 'parent' ? parent : nanny;
  const result = type.findByIdAndUpdate(req.body.id, { $set: req.body.formData }, (err, data) => {
    err
      ? res.status(400).send("failed to Update settings")
      : res.status(200).send(data)
  }
  );

  // userDataAfterUpdate = result._update.$set;
  // const tokenAfterUpdate = jwt.sign(userDataAfterUpdate, process.env.ENCRYPTION_KEY);
  // res.send(tokenAfterUpdate)
});
router.post('/profile', (req, res) => {
  const type = req.body.type === 'parent' ? parent : nanny;
  type.findById(req.body.id, (err, foundItem) => {
    res.send(foundItem)
  })

})

//Nanny Settings

export default router;
