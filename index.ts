// Kết nối database bằng typeorm
// bằng phương thức initialize. App sẽ lắng nghe các requests ở port 3000 của localhost.

import { AppDataSource } from "./src/data-source";
import { Product } from "./src/entity/Product";
import express from "express";
import bodyParser from 'body-parser';

const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Product);



  // Thêm mới product
    //Method POST ở URL /product/create chúng ta sẽ tìm xem có product cùng tên có tồn tại hay không.
    // Nếu chưa tồn tại product thì chúng ta sẽ tạo product theo data được gửi lên ở req.body.
    // Sau đó sẽ trả về product vừa tạo.
    // Nếu có lỗi thì sẽ show lỗi.
    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    mesage: "Sản phẩm đã tồn tại"
                })
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            };
            const product = await ProductRepo.save(productData);
            if (product) {
                res.status(200).json({
                    message: "Create product success",
                    product: product
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });



   // Update sản phẩm
   // Method PUT ở URL /product/update chúng ta sẽ tìm xem product có id được gửi lên tồn tại hay không.
     //   Nếu product không tồn tại thì sẽ báo lỗi.
      //  Nếu product tồn tại thì sẽ tiến hành update product.
    app.put("/product/update", async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    mesage: "Sản phẩm không tồn tại"
                })
            }
            const product = await ProductRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Update product success",
            });
        } catch (err) {
            res.status(500).json({
                message: err.messag
            })
        }
    });


    //Xóa sản phẩm
   // Method DELETE ở URL /product/delete chúng ta sẽ tìm xem product có id được gửi lên tồn tại hay không.
    //Nếu product không tồn tại thì sẽ báo lỗi.
       // Nếu product tồn tại thì sẽ tiến hành xóa product.
    app.delete("/product/delete", async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    mesage: "Sản phẩm không tồn tại"
                })
            }
            const product = await ProductRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete product success",
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    //Xem danh sách sản phẩm
    //Method GET ở URL /product/list
    // Chúng ta sẽ tìm toàn bộ sản phẩm và trả về response.
    app.get("/product/list", async (req, res) => {
        try {
            const products = await ProductRepo.find();
            if (products) {
                res.status(200).json({ message: "Sucess", products: products })
            }
        } catch (err) {
            res.status(500).json({ message: err.mesage })
        }
    });

    //Chi tiết sản phẩm
    //Method GET ở URL /product/detail.
    // Chúng ta sẽ tìm product theo id được gửi lên trong req.query.
    // Sau đó sẽ gửi lại product đó trong response.

    app.get("/product/detail", async (req, res) => {
        try {
            let productId = parseInt(req.query.productId as string);
            const product = await ProductRepo.findOneBy({ id: productId })
            if (product) {
                res.status(200).json({ message: "Sucess", product })
            }
        } catch (err) {
            res.status(500).json({ message: err.mesage })
        }
    });



    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    })

});