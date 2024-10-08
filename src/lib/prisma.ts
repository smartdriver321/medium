import { PrismaClient } from '@prisma/client'

declare global {
	// eslint-disable-next-line no-unused-vars
	var prisma: PrismaClient | undefined
}

// eslint-disable-next-line no-undef
const client = globalThis.prisma || new PrismaClient()
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client
