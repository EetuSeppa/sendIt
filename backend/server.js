const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.post('/saveRoute', function (req, res, next) {
   console.log(req.body); 
   res.status(202).send();
});

app.listen(PORT, ()=>console.log("Listening on port: ", PORT));