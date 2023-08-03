import express from "express";
import order from "../models/order.js";
import parent from "../models/parent.js";
import nanny from "../models/nanny.js";
const router = express.Router();

router.post("/order/create", (req, res) => {
  order.create({ ...req.body }, (err, data) => {
    err
      ? res.status(400).send(err.message)
      : res.status(200).send("order Created");
  });
});

router.post("/order/fetch", async (req, res) => {
  try {
    if (req.body.type === "parent") {
      var allData = await order.find({ parent_id: req.body.id });
      for (let i = 0; i < allData.length; i++) {
        const query = await nanny
          .findById(allData[i].nanny_id, { fullName: 1, city: 1, phone: 1 })
          .exec();
        allData[i] = { userData: allData[i], targetData: query };
      }
      res.status(200).json(allData);
    } else {
      var allData = await order.find({ nanny_id: req.body.id });
      for (let i = 0; i < allData.length; i++) {
        const query = await parent
          .findById(allData[i].parent_id, { fullName: 1, city: 1, phone: 1 })
          .exec();
        allData[i] = { userData: allData[i], targetData: query };
      }
      res.status(200).json(allData);
    }
  } catch (err) {
    res.send(err);
  }
});

router.put("/order/delete", (req, res) => {
  order.findByIdAndDelete({ _id: req.body._id }, (err, data) => {
    err ? res.status(404).send(err) : res.status(200).send("order deleted");
  });
});

export default router;
