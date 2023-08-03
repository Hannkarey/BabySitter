import express from "express";
import nanny from "../models/nanny.js";
import parent from "../models/parent.js";
const router = express.Router();



//Searching nannies
router.post("/search", (req, res) => {
  const { region, city, rating, priceMin, priceMax, age } = req.body;

  nanny.find(
    {
      $and: [
        // { $and: [{ region: region }, { $ne: null || undefined }] },
        city ? { city: city } : {},
        // { rating: { $gte: rating } },
        priceMin === 0 && priceMax === 0
          ? {}
          : priceMax === 0
            ? { pricing: { $gte: priceMin } }
            : {
              $and: [
                { pricing: { $gte: priceMin } },
                { pricing: { $lte: priceMax } },
              ],
            },
        age === 0 ? {} : { age: { $gte: age } },
        { availability: true },
      ],
    },
    (err, data) =>
      err ? res.status(400).send(err.message) : res.status(200).send(data)
  );
});

export default router;
