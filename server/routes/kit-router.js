const express = require("express");

const KitControl = require("../controllers/kit-control");

const router = express.Router();

router.post("/kit", KitControl.createKit); //in use
router.put("/kit/:id", KitControl.updateKit); //in use
router.delete("/kit/:id", KitControl.deleteKit); //in use
router.get("/kit/:species", KitControl.getKitsBySpecies);
router.get("/kits", KitControl.getAllKits); //in use

module.exports = router;
