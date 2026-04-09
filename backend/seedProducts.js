const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const artItems = [
    { name :"Lotus Mandala art" , price:299 , img:"1.jpg" },
    { name :"Dog Mandala art" , price:299 , img:"2.jpg" },
    { name :"Girl Mandala art" , price:299 , img:"3.jpg" },
    { name :"Deer Mandala art" , price:299 , img:"4.jpg" },
    { name :"Wolf Mandala art" , price:399 , img:"5.jpg" },
    { name :"Lord Mandala art" , price:399 , img:"6.jpg" },
    { name :"Tribal Mandala art" , price:399 , img:"7.jpg" },
    { name :"Seasons Mandala art" , price:399 , img:"8.jpg" },
    { name :"Swan Mandala art" , price:399 , img:"9.jpg" },
    { name :"Dog Pencil Sketch" , price:149 , img:"p1.jpg" },
    { name :"Deer Pencil Sketch" , price:299 , img:"p2.jpg" },
    { name :"Customisable Pencil Sketch" , price:499 , img:"p3.jpg" }
];

const seedProducts = async () => {
    try {
        await Product.deleteMany(); // Clear existing products
        console.log('Products cleared');

        const productsToInsert = artItems.map(item => ({
            title: item.name,
            description: `Beautiful ${item.name} piece to decorate your home.`,
            price: item.price,
            image: item.img,
            category: item.name.includes("Mandala") ? "Mandala" : "Sketch"
        }));

        await Product.insertMany(productsToInsert);
        console.log('Products seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
