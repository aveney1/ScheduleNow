import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootuser12!@",
  database: "capstone_localDB",
});

const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("Hello, this is the backend for ScheduleNow");
});

// Login - Authenticate user
app.get("/login/:username/:password", (req, res) => {
  const credentials = [req.params.username, req.params.password];

  const q = "SELECT * FROM Account WHERE (username = ? AND password = ?)";
  db.query(q, [credentials[0], credentials[1]], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Registration - Create account and employee
app.post("/registration", (req, res) => {
  const accountQ =
    "INSERT INTO Account (username, password, isActive) VALUES (?)";

  const accountValues = [
    req.body.username,
    req.body.password,
    req.body.isActive,
  ];

  db.query(accountQ, [accountValues], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Accounts - Get all accounts
app.get("/accounts/", (req, res) => {
  const q = "SELECT * FROM Account";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Accounts - Get account
app.get("/accounts/:username", (req, res) => {
  const username = req.params.username;
  const q = "SELECT id FROM Account WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0].id);
  });
});

// Accounts - change active status
app.put("/accounts/:id/:newstatus", (req, res) => {
  const id = req.params.id
  const newStatus = req.params.newstatus
  const q = "UPDATE Account SET isActive = "+newStatus+" WHERE id = "+id;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Account modified successfully");
  });
});

// Account - Update account password
app.put("/account/password", (req, res) => {
  // find employees account id then run query
  const q = "UPDATE Account SET password = ? WHERE id = ?";

  const values = [req.body.password];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment has been created successfully");
  });
});

// Employees - Get employee appointments
app.get("/employees/:id/appointments", (req, res) => {
  const q = "SELECT * FROM Appointment WHERE employeeId = ?";
  const employeeId = req.params.id;

  db.query(q, [employeeId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Employees - Get employee availability
app.get("/employees/:id/availability", (req, res) => {
  const q = "SELECT * FROM Availability WHERE employeeId = ?";
  const employeeId = req.params.id;

  db.query(q, [employeeId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Employees - Get all employees
app.get("/employees/", (req, res) => {
  const q = "SELECT * FROM Employee";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Employees - Create employee
app.post("/employees/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  const q =
    "INSERT INTO Employee (firstName, lastName, email, isManager, accountId) VALUES (?)";

  const employeeValues = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.isManager,
    accountId,
  ];

  db.query(q, [employeeValues], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// Employees - Get employee
app.get("/employees/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  const q =
    "SELECT * FROM Employee WHERE accountId = ?";

  db.query(q, accountId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Employees - Get employee names
app.get("/employees/names/:ids", (req, res) => {
  var employeeIds = req.params.ids;
  const q =
    "SELECT id, firstName, lastName FROM Employee WHERE id IN ("+employeeIds+")"
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  
  

});

// Appointments - Get all appointments
app.get("/appointments", (req, res) => {
  const q = "SELECT * FROM Appointment";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Appointments - Create appointment
app.post("/appointments", (req, res) => {
  const q =
    "INSERT INTO Appointment (date, startTime, endTime, status, employeeId, customerId) VALUES (?)";

  const values = [
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.status,
    req.body.employeeId,
    req.body.customerId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment has been created successfully");
  });
});

// Appointments - Delete appointment
app.delete("/appointments/:id", (req, res) => {
  const q = "DELETE FROM Appointment WHERE id = ?"
  const appointmentId = req.params.id;

  db.query(q, [appointmentId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment has been deleted successfully");
  });
});


// Appointments - Get appointment
app.get("/appointments/:id", (req, res) => {
  const q = "SELECT * FROM Appointment WHERE id = ?";
  const appointmentId = req.params.id;

  db.query(q, [appointmentId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Appointments - Update appointment
app.put("/appointments/:id", (req, res) => {
  const appointmentId = req.params.id;
  const q =
    "UPDATE Appointment SET date = ?, startTime = ?, endTime = ?, status = ? , employeeId = ?, customerId = ? WHERE id = ?";

  const values = [
    req.body.date,
    req.body.startTime,
    req.body.endTime,
    req.body.status,
    req.body.employeeId,
    req.body.customerId,
  ];

  db.query(q, [...values, appointmentId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment has been updated successfully");
  });
});

// Availability - Delete availability
app.delete("/availability/:id", (req, res) => {
  const q = "DELETE FROM Availability WHERE id = ?"
  const availId = req.params.id;

  db.query(q, [availId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Availability has been deleted successfully");
  });
});

// Availability - Get all availability
app.get("/availability", (req, res) => {
  const q = "SELECT * FROM Availability";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Availability - Create availability
app.post("/availability", (req, res) => {
  const q =
    "INSERT INTO Availability (day, startTime, endTime, employeeId) VALUES (?)";

  const values = [
    req.body.day,
    req.body.startTime,
    req.body.endTime,
    req.body.employeeId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Availability has been created successfully");
  });
});

// Availability - Get availability
app.get("/availability/:id", (req, res) => {
  const q = "SELECT * FROM Availability WHERE id = ?";
  const availabilityId = req.params.id;

  db.query(q, [availabilityId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Availability - Update availability
app.put("/availability/:id", (req, res) => {
  const availabilityId = req.params.id;
  const q =
    "UPDATE Availability SET day = ?, startTime = ?, endTime = ?, employeeId = ? WHERE id = ?";

  const values = [
    req.body.day,
    req.body.startTime,
    req.body.endTime,
    req.body.employeeId,
  ];

  db.query(q, [...values, availabilityId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Availability has been updated successfully");
  });
});


// Customer - Get customer
app.get("/customers/:id", (req, res) => {
  const q = "SELECT * FROM Customer WHERE id = ?";
  const customerId = req.params.id;

  db.query(q, [customerId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Customer - Get all customers
app.get("/customers/", (req, res) => {
  const q = "SELECT * FROM Customer";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Customer - Create customer
app.post("/customers/", (req, res) => {
  const q =
    "INSERT INTO Customer (firstName, lastName, email, street, city, state) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.street,
    req.body.city,
    req.body.state,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Customer has been created successfully");
  });
});

// LISTEN
app.listen(PORT, () => {
  console.log("Connected to backend, port is " + PORT);
});
