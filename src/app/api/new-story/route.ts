import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

// eslint-disable-next-line no-unused-vars
export async function POST(request: NextRequest) {
	const { userId }: { userId: string | null } = auth()

	if (!userId) {
		throw new Error('No user signed in')
	}

	try {
		const newStory = await prisma.story.create({
			data: {
				authorId: userId,
			},
		})

		return NextResponse.json(newStory)
	} catch (error) {
		return NextResponse.error()
	}
}

export async function PATCH(request: NextRequest) {
	const body = await request.json()
	const { userId }: { userId: string | null } = auth()

	if (!userId) {
		throw new Error('No user signed in')
	}

	const { storyId, content } = body

	if (!storyId || !content) {
		throw new Error('Missing fields')
	}

	console.log(storyId)

	const story = await prisma.story.findUnique({
		where: {
			id: storyId,
		},
	})

	if (!story) {
		throw new Error('No story were found')
	}

	try {
		await prisma.story.update({
			where: {
				id: story.id,
			},
			data: {
				content,
			},
		})

		return NextResponse.json('Successfully saved the story')
	} catch (error) {
		return NextResponse.error()
	}
}
