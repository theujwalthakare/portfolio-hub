const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function makeAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('Usage: node scripts/make-admin.js <email>');
    process.exit(1);
  }
  
  try {
    // First check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!existingUser) {
      console.log(`❌ User with email ${email} not found. Please login with GitHub first.`);
      return;
    }
    
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
    
    console.log(`✅ User ${user.email} (${user.name}) is now an admin`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();