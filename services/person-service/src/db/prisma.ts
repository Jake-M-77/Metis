import dotenv from "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";

// import PrismaPkg from "@prisma/client"
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// create pg pool (THIS replaces DATABASE_URL usage)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// create adapter
const adapter = new PrismaPg(pool);

// pass adapter into PrismaClient
export const prisma = new PrismaClient({
  adapter,
});


console.log("DB URL:", process.env.DATABASE_URL);
