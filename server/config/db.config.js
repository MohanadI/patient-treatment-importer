module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Mandsh1!@",
  DB: "test_hospitals",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};