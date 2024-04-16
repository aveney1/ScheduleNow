import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

// DB Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootuser12!@",
    database: "capstone_localDB"
 })

const PORT = process.env.PORT || 8800;

app.use(express.json())
app.use(cors())
app.get("/", (req,res)=>{
    res.json("Hello, this is the backend for ScheduleNow")
})


// Endpoints


// ACCOUNT ENDPOINTS

//TODO POST /login **************************
app.get("/login/:username", (req,res)=>{

    // const q = "SELECT * FROM Account WHERE username = ? and password = ?"
    // const credentials = [
    //     req.body.username,
    //     req.body.password
    // ];
    // const username = req.params.username;
    // const password = req.params.password;
    const credentials = [
        req.params.username,
        req.params.password
    ];
    const q = "SELECT * FROM Account WHERE username = ? AND password = ?"
    //Get availibility and appointment lists
    db.query(q,[req.params.username],[req.params.password], (err,data)=>{
        // db.query(q, (err,data)=>{

    if(err) return res.json(err)
        
        return res.json(data)
    });
})


//TODO POST /logout **************************

//TODO **************************
app.post("/registration", (req,res)=>{
    // run first query, get account id, run second query with account id
    const accountQ = "INSERT INTO Account (username, password, isActive) VALUES (?)";

    const accountValues = [
        req.body.username,
        req.body.password,
        req.body.isActive,
    ];
    
    console.log("in registration endpoint")
    db.query(accountQ, [accountValues], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
    

});

//TODO **************************
app.get("/account/home", (req,res)=>{
    //Get availibility and appointment lists
    db.query(q,[employeeId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})
app.get("/accounts/", (req,res)=>{
    const q = "SELECT * FROM Account"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.get("/accounts/:username", (req,res)=>{
    const username = req.params.username;
    const q = "SELECT id FROM Account WHERE username = ?"

    db.query(q, [username],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data[0].id)
    });
})

//TODO **************************
app.put("/account/password", (req,res)=>{
    // find employees account id then run query
    const q = "UPDATE Account SET password = ? WHERE id = ?"

    const values = [
        req.body.password,
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Appointment has been created successfully")
    });
});


// EMPLOYEE ENDPOINTS

app.get("/employees/:id/appointments", (req,res)=>{
    const q = "SELECT * FROM Appointment WHERE employeeId = ?"
    const employeeId = req.params.id;

    db.query(q,[employeeId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.get("/employees/:id/availability", (req,res)=>{
    const q = "SELECT * FROM Availbility WHERE employeeId = ?"
    const employeeId = req.params.id;

    db.query(q,[employeeId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.get("/employees/", (req,res)=>{
    const q = "SELECT * FROM Employee"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})
app.post("/employees/:accountId", (req,res)=>{
    const accountId = req.params.accountId;
    const q = "INSERT INTO Employee (firstName, lastName, email, isManager, accountId) VALUES (?)";
    
    const employeeValues = [
        req.body.firstName, 
        req.body.lastName,
        req.body.email,
        req.body.isManager,
        accountId
    
    ]

    db.query(q, [employeeValues],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

// APPOINTMENT ENDPOINTS

app.get("/appointments", (req,res)=>{
    const q = "SELECT * FROM Appointment"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/appointments", (req,res)=>{
    const q = "INSERT INTO Appointment (date, startTime, endTime, status, employeeId, customerId) VALUES (?)";

    const values = [
        req.body.date,
        req.body.startTime,
        req.body.endTime, 
        req.body.status,
        req.body.employeeId, 
        req.body.customerId
    ];
    console.log(values)
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Appointment has been created successfully")
    });
});

app.get("/appointments/:id", (req,res)=>{
    const q = "SELECT * FROM Appointment WHERE id = ?"
    const appointmentId = req.params.id;

    db.query(q,[appointmentId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.put("/appointments/:id", (req,res)=>{
    const appointmentId = req.params.id;
    const q = "UPDATE Appointment SET date = ?, startTime = ?, endTime = ?, status = ? , employeeId = ?, customerId = ? WHERE id = ?"

    const values = [
        req.body.date,
        req.body.startTime,
        req.body.endTime, 
        req.body.status,
        req.body.employeeId,
        req.body.customerId
    ];

    db.query(q,[...values,appointmentId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Appointment has been updated successfully")
    });
});


//TODO appointments/search **************************



// AVAILABILITY ENDPOINTS

app.get("/availability", (req,res)=>{
    const q = "SELECT * FROM Availability"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/availability", (req,res)=>{
    const q = "INSERT INTO Availability (day, startTime, endTime, employeeId) VALUES (?)";

    const values = [
        req.body.day,
        req.body.startTime,
        req.body.endTime, 
        req.body.employeeId 
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Availability has been created successfully")
    });
});

app.get("/availability/:id", (req,res)=>{
    const q = "SELECT * FROM Availability WHERE id = ?"
    const availabilityId = req.params.id;

    db.query(q,[availabilityId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.put("/availability/:id", (req,res)=>{
    const availabilityId = req.params.id;
    const q = "UPDATE Availability SET day = ?, startTime = ?, endTime = ?, employeeId = ? WHERE id = ?"

    const values = [
        req.body.day,
        req.body.startTime,
        req.body.endTime, 
        req.body.employeeId,
    ];

    db.query(q,[...values, availabilityId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Availability has been updated successfully")
    });
});


//TODO availibility/search **************************



// CUSTOMER ENDPOINTS

//TODO customer/search **************************

app.get("/customers/:id", (req,res)=>{
    const q = "SELECT * FROM Customer WHERE id = ?"
    const customerId = req.params.id;

    db.query(q,[customerId], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.get("/customers/", (req,res)=>{
    const q = "SELECT * FROM Customer"

    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})
app.post("/customers/", (req,res)=>{
    const q = "INSERT INTO Customer (firstName, lastName, email, street, city, state) VALUES (?)";

    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email, 
        req.body.street,
        req.body.city, 
        req.body.state 
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Customer has been created successfully")
    });
})


// LISTEN
app.listen(PORT, ()=>{
    console.log("Connected to backend, port is " + PORT)
})



// app.get("/books", (req,res)=>{
//     const q = "SELECT * FROM books"
//     db.query(q, (err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })


// app.post("/books", (req,res)=>{
//     const q = "INSERT INTO books (title,description,price,cover) VALUES (?)";
//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.price, 
//         req.body.cover,
//     ];
//     db.query(q, [values], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Book has been created successfully")
//     });
// });

// app.delete("/books/:id", (req,res)=>{
//     const bookId = req.params.id;
//     const q = "DELETE FROM books WHERE id = ?"

//     db.query(q,[bookId], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Book has been deleted successfully")
//     });
// });

// app.put("/books/:id", (req,res)=>{
//     const bookId = req.params.id;
//     const q = "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?"

//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.price, 
//         req.body.cover,
//     ];

//     db.query(q,[...values,bookId], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json("Book has been updated successfully")
//     });
// });


// app.get("/books/:id", (req,res)=>{
//     const bookId = req.params.id;
//     const q = "SELECT * FROM books WHERE id = ?"

//     db.query(q,[bookId], (err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     });
// })

