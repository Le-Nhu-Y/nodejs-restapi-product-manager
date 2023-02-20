"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("./src/data-source");
var Product_1 = require("./src/entity/Product");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var PORT = 3000;
data_source_1.AppDataSource.initialize().then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app, ProductRepo;
    return __generator(this, function (_a) {
        app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        ProductRepo = connection.getRepository(Product_1.Product);
        app.post("/product/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var productSearch, productData, product, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, ProductRepo.findOneBy({ name: req.body.name })];
                    case 1:
                        productSearch = _a.sent();
                        if (productSearch) {
                            res.status(500).json({
                                mesage: "Sản phẩm đã tồn tại"
                            });
                        }
                        productData = {
                            name: req.body.name,
                            avatar: req.body.avatar,
                            author: req.body.author,
                            price: req.body.price
                        };
                        return [4, ProductRepo.save(productData)];
                    case 2:
                        product = _a.sent();
                        if (product) {
                            res.status(200).json({
                                message: "Create product success",
                                product: product
                            });
                        }
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).json({
                            message: err_1.message
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); });
        app.put("/product/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var productSearch, product, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, ProductRepo.findOneBy({ id: req.body.id })];
                    case 1:
                        productSearch = _a.sent();
                        if (!productSearch) {
                            res.status(500).json({
                                mesage: "Sản phẩm không tồn tại"
                            });
                        }
                        return [4, ProductRepo.update({ id: req.body.id }, req.body)];
                    case 2:
                        product = _a.sent();
                        res.status(200).json({
                            message: "Update product success",
                        });
                        return [3, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(500).json({
                            message: err_2.messag
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); });
        app.delete("/product/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var productSearch, product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, ProductRepo.findOneBy({ id: req.body.id })];
                    case 1:
                        productSearch = _a.sent();
                        if (!productSearch) {
                            res.status(500).json({
                                mesage: "Sản phẩm không tồn tại"
                            });
                        }
                        return [4, ProductRepo.delete({ id: req.body.id })];
                    case 2:
                        product = _a.sent();
                        res.status(200).json({
                            message: "Delete product success",
                        });
                        return [3, 4];
                    case 3:
                        err_3 = _a.sent();
                        res.status(500).json({
                            message: err_3.message
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); });
        app.get("/product/list", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var products, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, ProductRepo.find()];
                    case 1:
                        products = _a.sent();
                        if (products) {
                            res.status(200).json({ message: "Sucess", products: products });
                        }
                        return [3, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({ message: err_4.mesage });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); });
        app.get("/product/detail", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var productId, product, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = parseInt(req.query.productId);
                        return [4, ProductRepo.findOneBy({ id: productId })];
                    case 1:
                        product = _a.sent();
                        if (product) {
                            res.status(200).json({ message: "Sucess", product: product });
                        }
                        return [3, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json({ message: err_5.mesage });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); });
        app.listen(PORT, function () {
            console.log("App running with port: " + PORT);
        });
        return [2];
    });
}); });
//# sourceMappingURL=index.js.map