const express = require("express");

const KitControl = require("../controllers/kit-control");

const router = express.Router();

router.post("/kit", KitControl.createKit);
router.put("/kit/:id", KitControl.updateKit);
router.delete("/kit/:id", KitControl.deleteKit);
router.get("/kit/:species", KitControl.getKitsBySpecies);
router.get("/kits", KitControl.getKits);

module.exports = router;
