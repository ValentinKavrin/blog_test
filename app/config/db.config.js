/*CREATE DATABASE "blogDb"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;*/

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "dashadom74",
    DB: "blogDb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};