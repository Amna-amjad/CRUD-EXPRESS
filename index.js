const express = require("express");
const app = express();
app.use(express.json());

app.listen(8000, () => {
  console.log("Server is up");
});

let contacts = [
  {
    id: 1,
    name: "amna",
  },
];

app.get("/contact", (req, res) => {
  res.send({
    success: true,
    message: "Data fetched successfully",
    data: contacts,
  });
});

app.post("/contact", (req, res) => {
  var name = req.body.name;
  if (name) {
    contacts.push({
      id: (contacts.length + 1).toString(),
      name: name,
    });
    res.send({
      success: true,
      message: "data added successfully",
    });
  } else {
    res.send({
      success: false,
      message: "validation error",
      errors: [
        {
          field: "name",
          message: "cannot be null",
        },
      ],
    });
  }
});

app.delete("/contact/:id", (req, res) => {
  var id = req.params.id;
  var newConacts = contacts.filter((el) => el.id != id);
  contacts = newConacts;

  res.send({
    success: true,
    message: "data deleted successfully",
  });
});

app.put('/contact/:id', (req, res) => {
  var id = req.params.id;
  var name = req.body.name;
if(name){
    var index = contacts.findIndex(el => el.id == id);

    contacts[index] = {
      ...contacts[index],
      name:name
    };
    res.send({
      success: true,
      message: "data updated"
    });
}
else{
    res.send({
        success: false,
        message: "validation error",
        errors: [
          {
            field: "name",
            message: "cannot be null",
          },
        ],
      });
}

});
