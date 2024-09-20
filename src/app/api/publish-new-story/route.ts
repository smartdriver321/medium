import { NextResponse, NextRequest } from 'next/server'

import prisma from '@/lib/prisma'

export async function PATCH(request: NextRequest) {
	const { storyId, topics } = await request.json()

	if (!storyId) {
		throw new Error('No storyId was found')
	}

	const story = await prisma.story.findUnique({
		where: {
			id: storyId,
		},
	})

	if (!story) {
		throw new Error('No story were found')
	}

	try {
		const updatedStory = await prisma.story.update({
			where: {
				id: story.id,
			},
			data: {
				publish: true,
				topics: topics,
			},
		})

		return NextResponse.json(updatedStory)
	} catch (error) {
		console.log(error)
		return NextResponse.error()
	}
}
