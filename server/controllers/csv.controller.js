const db = require("../models");
const Patients = db.patients;
const Treatments = db.treatments;

const fs = require("fs");
const csv = require("fast-csv");

const Mapper = require('../helpers/mapper');

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let initialData = [];
    let path = __basedir + "/resources/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        initialData.push(row);
      })
      .on("end", () => {
        let type = 'patient';
        if (req.file.originalname.includes("Treatment")) {
          type = 'treatment';
        }
        let dataToInsert = Mapper.map(initialData, type);
        if (type === 'patient') {
          addPatient(req, res, dataToInsert);
        } else {
          addTreatment(req, res, dataToInsert);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const addPatient = (req, res, dataToInsert) => {
  Patients.bulkCreate(dataToInsert)
    .then(() => {
      res.status(200).send({
        message:
          "Uploaded the file successfully: " + req.file.originalname,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    });
};

const addTreatment = (req, res, dataToInsert) => {
  Treatments.bulkCreate(dataToInsert)
    .then(() => {
      res.status(200).send({
        message:
          "Uploaded the file successfully: " + req.file.originalname,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    });
};

const getPatients = (req, res) => {
  Patients.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients.",
      });
    });
};

module.exports = {
  upload,
  getPatients
};
