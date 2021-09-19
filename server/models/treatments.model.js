module.exports = (sequelize, Sequelize) => {
  const Treatments = sequelize.define("treatments", {
    patientId: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.STRING
    },
    endDate: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.STRING
    },
    displayName: {
      type: Sequelize.STRING
    },
    diagnoses: {
      type: Sequelize.STRING
    },
    treatmentLine: {
      type: Sequelize.STRING
    },
    cyclesXDays: {
      type: Sequelize.STRING
    },
    treatmentId: {
      type: Sequelize.STRING
    }
  });

  return Treatments;
};