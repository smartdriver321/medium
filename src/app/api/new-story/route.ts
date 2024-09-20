import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
	const { userId }: { userId: string | null } = auth()

	if (!userId) {
		throw new Error('No user signed in')
	}

	try {
		const NewStory = await prisma.story.create({
			data: {
				authorId: userId,
			},
		})

		return NextResponse.json(NewStory)
	} catch (error) {
		return NextResponse.error()
	}
}
