import "dotenv/config";
import app from "./src/app.js";
import db from "./src/db/index.js";
import { users } from "./src/models/schema.js";
import { eq } from "drizzle-orm";

// Check Database connection. Will delete it later
const checkDbConnection = async () => {
    try {
        await db.execute("SELECT 1");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed" + error);
        process.exit(1);
    }
};

checkDbConnection();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});