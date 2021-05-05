// const mongoose = require('mongoose');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');
// const Campground = require('../models/campground');

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const sample = array => array[Math.floor(Math.random() * array.length)];


// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const camp = new Campground({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`
//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })


const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany ( {} );
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '607fccfdfa70f65c8e5af835',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { 
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude 
              ] 
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dmca9ldbv/image/upload/v1619504993/YelpCamp/rnqnkuc75lsxwcw78hkd.jpg',
                  filename: 'YelpCamp/rnqnkuc75lsxwcw78hkd'
                },
                {
                  url: 'https://res.cloudinary.com/dmca9ldbv/image/upload/v1619504995/YelpCamp/skm7auu5efn3nafszknw.jpg',
                  filename: 'YelpCamp/skm7auu5efn3nafszknw'
                },
                {
                  url: 'https://res.cloudinary.com/dmca9ldbv/image/upload/v1619504998/YelpCamp/wxqfa3qazhnandywq5lv.jpg',
                  filename: 'YelpCamp/wxqfa3qazhnandywq5lv'
                }
              ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora praesentium quidem deleniti harum fugit voluptatem ipsam provident ipsa, ad aliquid eveniet nostrum. Et nemo at in vitae numquam iste id.',
            price 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})