import db from "../db/index.js";
import { expenses } from "../models/schema.js";

export const create = async (data) => {
    return await db.insert(expenses).values(data);
};