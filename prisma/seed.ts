import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding GreenCredits database...");

    // Create sample users
    const user1 = await prisma.user.upsert({
        where: { email: "aarav.sharma@example.com" },
        update: {},
        create: {
            email: "aarav.sharma@example.com",
            name: "Aarav Sharma",
            phone: "+91 98765 43210",
            totalCredits: 245,
            greenScore: 294,
            onboarded: true,
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: "priya.patel@example.com" },
        update: {},
        create: {
            email: "priya.patel@example.com",
            name: "Priya Patel",
            phone: "+91 87654 32109",
            totalCredits: 380,
            greenScore: 456,
            onboarded: true,
        },
    });

    const user3 = await prisma.user.upsert({
        where: { email: "rohan.kumar@example.com" },
        update: {},
        create: {
            email: "rohan.kumar@example.com",
            name: "Rohan Kumar",
            phone: "+91 76543 21098",
            totalCredits: 115,
            greenScore: 138,
            onboarded: true,
        },
    });

    // Action logs for user1
    await prisma.actionLog.createMany({
        data: [
            { userId: user1.id, type: "RECYCLE", details: "plastic recycled", quantity: 10, unit: "kg", credits: 50 },
            { userId: user1.id, type: "TRANSPORT", details: "metro travel", quantity: 25, unit: "km", credits: 50 },
            { userId: user1.id, type: "PLANTATION", details: "Planted 5 tree(s)", quantity: 5, unit: "trees", credits: 50 },
            { userId: user1.id, type: "SAVINGS", details: "water saved", quantity: 50, unit: "liters", credits: 50 },
            { userId: user1.id, type: "REDUCTION", details: "5 car trip(s) avoided", quantity: 5, unit: "trips", credits: 20 },
        ],
    });

    // Action logs for user2
    await prisma.actionLog.createMany({
        data: [
            { userId: user2.id, type: "RECYCLE", details: "e-waste recycled", quantity: 8, unit: "kg", credits: 80 },
            { userId: user2.id, type: "RECYCLE", details: "paper recycled", quantity: 20, unit: "kg", credits: 60 },
            { userId: user2.id, type: "TRANSPORT", details: "bus travel", quantity: 40, unit: "km", credits: 80 },
            { userId: user2.id, type: "PLANTATION", details: "Planted 10 tree(s)", quantity: 10, unit: "trees", credits: 100 },
            { userId: user2.id, type: "SAVINGS", details: "electricity saved", quantity: 30, unit: "kWh", credits: 60 },
        ],
    });

    // Action logs for user3
    await prisma.actionLog.createMany({
        data: [
            { userId: user3.id, type: "RECYCLE", details: "glass recycled", quantity: 5, unit: "kg", credits: 20 },
            { userId: user3.id, type: "TRANSPORT", details: "train travel", quantity: 15, unit: "km", credits: 30 },
            { userId: user3.id, type: "REDUCTION", details: "10 car trip(s) avoided", quantity: 10, unit: "trips", credits: 40 },
        ],
    });

    // Transactions for all users
    await prisma.transaction.createMany({
        data: [
            { userId: user1.id, type: "EARN", amount: 245, note: "Total from eco actions" },
            { userId: user2.id, type: "EARN", amount: 380, note: "Total from eco actions" },
            { userId: user2.id, type: "REDEEM", amount: 50, place: "Government Hospital" },
            { userId: user3.id, type: "EARN", amount: 115, note: "Total from eco actions" },
        ],
    });

    // Bank details for user1
    await prisma.bankDetails.upsert({
        where: { userId: user1.id },
        update: {},
        create: {
            userId: user1.id,
            bankName: "State Bank of India",
            accountNo: "1234567890",
            ifsc: "SBIN0001234",
        },
    });

    console.log("✅ Seed complete!");
    console.log(`   Created users: ${user1.name}, ${user2.name}, ${user3.name}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
