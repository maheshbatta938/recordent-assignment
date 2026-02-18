const db = require('../config/db');
const csv = require('csv-parser');
const fs = require('fs');



exports.uploadFile = (req, res) => {

    const userId = req.user.id;

    console.log("UPLOAD USER:", userId);

    console.log("FILE PATH:", req.file?.path);

    if(!req.file){
        return res.send({ message: "No file received" });
    }

    const fs = require("fs");

    fs.readFile(req.file.path, "utf8", (err, data) => {

        if(err){
            console.log("READ ERROR:", err);
            return res.send({ message: "File read error" });
        }

        data = data.replace(/^\uFEFF/, "");

        const rows = data.split(/\r?\n/);

        console.log("TOTAL ROWS:", rows.length);

        rows.shift();

        rows.forEach(row => {

            if(!row || row.trim() === "") return;

            const values = row.split(",").map(val => 
            val.replace(/"/g, "").trim()
            );
            


            if(values.length < 7) return;

            console.log("INSERTING:", values[0]);

            db.query(
                `INSERT INTO buyers
                (user_id,name,email,mobile,address,total_invoice_amount,total_amount_paid,total_amount_due)
                VALUES (?,?,?,?,?,?,?,?)`,
                [userId, ...values],
                (err)=>{
                    if(err) console.log("INSERT ERROR:", err);
                }
            );

        });

        res.send({ message: "Upload success" });

    });

};




// ✅ View Buyers

exports.viewBuyers = (req, res) => {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const search = req.query.search || "";

    const userId = req.user.id;

    console.log("Viewing buyers for user:", userId);

    const query = `
        SELECT * FROM buyers
        WHERE user_id = ?
        AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)
        LIMIT ? OFFSET ?
    `;

    db.query(

        query,

        [

            userId,

            `%${search}%`,

            `%${search}%`,

            `%${search}%`,

            limit,

            offset

        ],

        (err, result) => {

            if(err){

                console.log(err);

                return res.send({

                    data: []

                });

            }

            res.send({

                data: result

            });

        }

    );

};
