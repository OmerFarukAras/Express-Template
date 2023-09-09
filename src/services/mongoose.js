// mongoose init code here

import mongoose from "mongoose";

export function MongooseService(logger) {
    mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,

    })
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((err) => {
        logger.error("Error connecting to MongoDB", err);
    });
}