module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "B4nd03ngMerd3k4",
    DB: "dbIntegrasi",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };