const Kit = require("../models/kit-model");

createKit = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a kit."
    });
  }

  const kit = new Kit(body);

  if (!kit) {
    return res.status(400).json({ success: false, error: err });
  }

  kit
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: kit._id,
        message: "Kit created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Kit not created!"
      });
    });
};

updateKit = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide constants to update."
    });
  }

  Kit.findOne({ id: req.params.id }, (err, kit) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Kit not found!"
      });
    }
    kit.name = body.name;
    kit.species = body.species;
    kit.type = body.type;
    kit.constants = body.constants;
    kit
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: kit._id,
          message: "Kit updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "Kit not updated!"
        });
      });
  });
};

deleteKit = async (req, res) => {
  await Kit.findOneAndDelete({ id: req.params.id }, (err, kit) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!kit) {
      return res.status(404).json({ success: false, error: `Kit not found` });
    }

    return res.status(200).json({ success: true, data: kit });
  }).catch(err => console.log(err));
};

getKitsBySpecies = async (req, res) => {
  await Kit.find({ species: req.params.species }, (err, kit) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!kit) {
      return res.status(404).json({ success: false, error: `Kit not found` });
    }
    return res.status(200).json({ success: true, data: kit });
  }).catch(err => console.log(err));
};

//might not need this one, it grabs all the kits
getKits = async (req, res) => {
  await Kit.find({}, (err, kits) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!kits.length) {
      return res.status(404).json({ success: false, error: `Kit not found` });
    }
    return res.status(200).json({ success: true, data: kits });
  }).catch(err => console.log(err));
};

module.exports = {
  createKit,
  updateKit,
  deleteKit,
  getKits,
  getKitsBySpecies
};
