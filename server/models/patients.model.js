module.exports = (sequelize, Sequelize) => {
  const Patients = sequelize.define("patients", {
    patientId: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    mrn: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.STRING
    },
    isDeceased: {
      type: Sequelize.STRING
    },
    dateOfDeath: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    sex: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zipCode: {
      type: Sequelize.STRING
    }
  });

  return Patients;
};