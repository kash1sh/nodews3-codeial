
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if (env.name == 'development'){
            return filePath;
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}

// maine abhi actually production vaala add kiya hai, tabse aa raha hai
// mismatch url aur login issues, ookk 
// iska reason pata hai?  i believe tumen call back url ka path google developers par wrong set kiya h
//  nahi , kyunki jo local sign-in hai vo bhi nahi ho rahe, usme bhi invalid show ho raha hai, bhaii raise another doubt ,pls, ,will do
// ok bhai, thanks for helping, bas agli baar se thoda wait kar loiya karo, in  ninja vaalo ki notifs nahi aate , toh baar baar khud check karna pata hai,okk 