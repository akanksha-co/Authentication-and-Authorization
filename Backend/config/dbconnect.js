const mongoose = require('mongoose');
require('dotenv').config();
exports.dbconnect = (function() {
    return () => {
        mongoose.connect(process.env.URL)
            //Accept
            .then(() => console.log("database has been connected"))
            //Reject
            .catch((error) => {
                console.error(error.message);
                process.exit(1);
            });
    };
})();
