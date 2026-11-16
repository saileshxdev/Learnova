import { connectDB } from '../config/db.js';
import { initDB } from './initDB.js';
import { findUserByEmail, registerUser } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
    try {
        await connectDB();
        await initDB();

        const defaultEmail = 'sailesh@learnova.app';
        const existing = await findUserByEmail(defaultEmail);

        if (!existing) {
            await registerUser('Sailesh', defaultEmail, 'password123');
            console.log(`✓ Seeded default user: ${defaultEmail} (password: password123)`);
        } else {
            console.log(`ℹ Default user (${defaultEmail}) already exists.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
