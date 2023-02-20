"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Product_1 = require("./entity/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "dbTest",
    synchronize: false,
    logging: false,
    entities: [Product_1.Product],
    migrations: ["dist/src/migrations/*.js"],
});
//# sourceMappingURL=data-source.js.map