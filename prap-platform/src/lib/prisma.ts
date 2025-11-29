import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import {PrismaClient} from '@prisma/client'

// 1. Setup the connection pool using your DATABASE_URL
const connectionString = `${process.env.DATABASE_URL}`


const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// 2. Define the global type to prevent multiple instances in Dev mode
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// 3. Initialize Prisma with the Adapter
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma