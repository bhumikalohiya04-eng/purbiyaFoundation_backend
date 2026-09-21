const express = require("express");
const db = require("./db");
const path = require("path");
const mysql = require("mysql2");
 const nodemon = require("nodemon");

const cors = require("cors");
const connection = require("./db");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));


const multer = require("multer");

const upload = multer({
    dest: "public/uploads/"
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM admins WHERE email=? AND password=?";

    connection.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length > 0) {

            res.json({
                success: true,
                message: "Login Successful"
            });

        } else {

            res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

    });

});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});


app.post("/change-password", (req, res) => {

    const { oldPassword, newPassword } = req.body;

    const email = "admin@purbiyafoundation.org";

    const checkSql = "SELECT * FROM admins WHERE email=? AND password=?";

    connection.query(
        checkSql,
        [email, oldPassword],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "Old password incorrect"
                });
            }


            const updateSql =
                "UPDATE admins SET password=? WHERE email=?";


            connection.query(
                updateSql,
                [newPassword, email],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Password update failed"
                        });
                    }


                    res.json({
                        success: true,
                        message: "Password updated successfully"
                    });

                }
            );

        }
    );
});

// app.post("/blogs", upload.single("image"), (req,res)=>{

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

// });

app.post("/blogs", upload.single("image"), (req, res) => {

    const {
        title,
        category_id,
        blog_date,
        description
    } = req.body;


    const image = req.file
        ? "/uploads/" + req.file.filename
        : null;


    const sql = `
    INSERT INTO blogs
    (
        image,
        title,
        blog_date,
        category_id,
        description
    )
    VALUES(?,?,?,?,?)
    `;


    connection.query(
        sql,
        [
            image,
            title,
            blog_date,
            category_id,
            description
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }


            res.json({
                message: "Blog Added Successfully"
            });

        }
    );

});


app.get("/blogs", (req,res)=>{

    const sql = `
    SELECT 
        blogs.id,
        blogs.image,
        blogs.title,
        blogs.blog_date,
        blogs.description,
        blog_categories.category_name
    FROM blogs
    LEFT JOIN blog_categories
    ON blogs.category_id = blog_categories.id
    WHERE blogs.deleted_at IS NULL
    ORDER BY blogs.id DESC
    `;


    connection.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


app.delete("/blogs/:id",(req,res)=>{

    const id=req.params.id;

    const sql="DELETE FROM blogs WHERE id=?";


    connection.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json({
                message:err.message
            });
        }


        res.json({
            message:"Blog Deleted Successfully"
        });

    });

});


app.put("/blogs/:id",(req,res)=>{


    const id=req.params.id;


    const {
        title,
        category_id,
        blog_date,
        description
    }=req.body;


    const sql=`

    UPDATE blogs SET

    title=?,
    category_id=?,
    blog_date=?,
    description=?

    WHERE id=?

    `;


    connection.query(
        sql,
        [
            title,
            category_id,
            blog_date,
            description,
            id
        ],

        (err)=>{


            if(err){

                return res.status(500).json(err);

            }


            res.json({
                message:"Blog Updated"
            });


        }
    );


});


app.post("/events", upload.single("image"), (req,res)=>{

    const {
        title,
        event_date,
        event_time,
        location,
        description
    } = req.body;


    const image = req.file
    ? "/uploads/" + req.file.filename
    : null;


    const sql = `
    INSERT INTO events
    (
        image,
        title,
        event_date,
        event_time,
        description,
        location
    )
    VALUES(?,?,?,?,?,?)
    `;


    connection.query(
        sql,
        [
            image,
            title,
            event_date,
            event_time,
            description,
            location
        ],
        (err,result)=>{

            if(err){
                console.log(err);

                return res.status(500).json({
                    message:err.message
                });
            }


            res.json({
                message:"Event Added Successfully"
            });

        }
    );


});


app.get("/events",(req,res)=>{


    connection.query(
        "SELECT * FROM events ORDER BY id DESC",

        (err,result)=>{

            if(err)
            {
                return res.status(500).json(err);
            }


            res.json(result);

        }
    );


});




app.delete("/events/:id",(req,res)=>{


let id=req.params.id;


connection.query(
"DELETE FROM events WHERE id=?",
[id],

(err)=>{


if(err)
return res.status(500).json(err);


res.json({
message:"Event Deleted"
});


});


});


app.get("/events/:id",(req,res)=>{

    const id=req.params.id;


    connection.query(
        "SELECT * FROM events WHERE id=?",
        [id],

        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }


            res.json(result[0]);

        }
    );

});


app.put("/events/:id", upload.single("image"), (req,res)=>{


    const id=req.params.id;


    const {
        title,
        event_date,
        event_time,
        location,
        description
    }=req.body;



    let sql;
    let values;



    if(req.file){


        sql=`
        UPDATE events SET

        image=?,
        title=?,
        event_date=?,
        event_time=?,
        location=?,
        description=?

        WHERE id=?
        `;


        values=[

            "/uploads/"+req.file.filename,
            title,
            event_date,
            event_time,
            location,
            description,
            id

        ];



    }
    else{


        sql=`
        UPDATE events SET

        title=?,
        event_date=?,
        event_time=?,
        location=?,
        description=?

        WHERE id=?
        `;


        values=[

            title,
            event_date,
            event_time,
            location,
            description,
            id

        ];


    }



    connection.query(
        sql,
        values,

        (err)=>{


            if(err){

                console.log(err);

                return res.status(500).json(err);

            }


            res.json({

                message:"Event Updated Successfully"

            });


        }
    );


});

app.get("/", (req, res) => {
    res.send("API Working");
});

//````````````````````logout``````````````````//


app.post("/logout", (req, res) => {
    res.json({
        message: "Logout Successfully"
    });
});

//endline......

app.listen(1000, () => {
    console.log("Server Running On Port 1000");
});

module.exports = connection;