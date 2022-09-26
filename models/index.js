import mongoose from "mongoose";
import urlSchema from "./url.model.js";
import dotenv from "dotenv";
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.connectionString = process.env.MONGO_URI;
db.url = urlSchema(mongoose);

export default db;
