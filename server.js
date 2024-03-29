const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
// const profile = require('./routes/api/profile');
const tests = require('./routes/api/tests');



const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db,  {useNewUrlParser: true})
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
// app.use('/api/profile', profile);
app.use('/api/tests', tests);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
