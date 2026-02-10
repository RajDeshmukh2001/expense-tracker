import "dotenv/config";
import db from "./index.js";
import { users } from "../models/schema.js";
import { create, findByCategory } from "../repositories/category.repository.js";

const seedUsers = [{ name: "user", email: "user@gmail.com" }];

const seedCategories = ["EMI", "Food", "Transport", "Healthcare", "Rent", "Other"];

async function seed() {
    try {
        console.log("Seeding Users");
        await db.insert(users).values(seedUsers);

        console.log("Seeding Categories");
        for (const category of seedCategories) {
            const exists = await findByCategory(category);
            if (exists.length > 0) {
                console.log(`Category '${category}' already exists, skipping.`);
            } else {
                await create(category);
            }
        }

        console.log("Seeding complete!");
    } catch (error) {
        console.log("Seeding failed: " + error);
    } finally {
        process.exit(0);
    }
}

seed();