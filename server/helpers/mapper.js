const utilities = require('./utilities');

const patientMappedKeys = {
  dob: [
    "dob", "patientdob"
  ],
  patientid: [
    "patientid"
  ],
  mrn: [
    "mrn",
  ],
  isdeceased: [
    "isdeceased", "ispatientdeceased"
  ],
  firstname: [
    "firstname"
  ],
  lastname: [
    "lastname"
  ],
  dateofdeath: [
    "dateofdeath", "dod_ts", "deathdate"
  ],
  gender: [
    "gender"
  ],
  sex: [
    "sex"
  ],
  city: [
    "city", "addresscity"
  ],
  address: [
    "address", "addressline"
  ],
  state: [
    "state", "addressstate"
  ],
  zipcode: [
    "zipcode", "addresszipcode"
  ]
};


const treatmentMappedKeys = {
  patientid: [
    "patientid"
  ],
  startdate: [
    "startdate"
  ],
  enddate: [
    "enddate",
  ],
  active: [
    "active", "status" // need value format
  ],
  displayname: [
    "displayname"
  ],
  diagnoses: [
    "diagnoses", "associateddiagnoses"
  ],
  treatmentline: [
    "treatmentline", "protocolid"
  ],
  cyclesxdays: [
    "cyclesxdays", "numberofcycles"  // need value format
  ],
  treatmentid: [
    "treatmentid"
  ]
};

const patient = {
  patientId: "",
  firstName: "",
  lastName: "",
  mrn: "",
  dob: "",
  isDeceased: "",
  dateOfDeath: "",
  gender: "",
  sex: "",
  city: "",
  address: "",
  state: "",
  zipCode: ""
};

const treatment = {
  patientId: "",
  startDate: "",
  endDate: "",
  active: "",
  displayName: "",
  diagnoses: "",
  treatmentLine: "",
  cyclesXDays: "",
  treatmentId: ""
};

const map = (dataToMap, type = 'patient') => {
  let mappedData = [];
  dataToMap.forEach((item) => {
    mappedData.push(format(item, type));
  });
  return mappedData;
};

const format = (data, type) => {
  let cleanedData = utilities.cleanData(data);

  let formattedData = Object.assign({}, patient);
  if (type === "treatment") {
    formattedData = Object.assign({}, treatment);
  }

  let formattedKeys = Object.keys(formattedData);

  formattedKeys.forEach(key => {
    formattedData[key] = getValue(cleanedData, key.toLowerCase(), type);
  });

  return formattedData;
};

const getValue = (data, key, type) => {

  let mappedKeys = patientMappedKeys;
  if (type === "treatment") {
    mappedKeys = treatmentMappedKeys;
  }

  if (mappedKeys[key]) {
    for (let k of mappedKeys[key]) {
      if (data[k] !== undefined) {
        switch (k) {
          case "numberofcycles":
            return calculateCycles(data);
          case "status":
            return data[k] === "Active" ? "Ordered" : data[k];
          default:
            return data[k];
        }
      }
    }
  }
  return data[key];
};

const calculateCycles = (data) => {
  let numberOfDays = utilities.dateDiff(
    utilities.parseDate(data['startdate']),
    utilities.parseDate(data['enddate'])
  );
  return numberOfDays / data['numberofcycles'];
};

module.exports = {
  map
};