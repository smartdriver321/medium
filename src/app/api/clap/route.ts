import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
	const { userId } = auth()
	if (!userId) throw new Error('No user found')

	try {
		const { storyId } = await request.json()
		const storyExist = await prisma.story.findUnique({
			where: {
				id: storyId,
			},
		})

		if (!storyExist) {
			throw new Error('No stories were found to clap')
		}

		const clapped = await prisma.clap.findFirst({
			where: {
				storyId,
				userId,
			},
		})

		if (clapped && clapped.clapCount < 50) {
			await prisma.clap.update({
				where: {
					id: clapped.id,
				},
				data: {
					clapCount: clapped.clapCount + 1,
				},
			})

			return NextResponse.json('Clap updated!')
		} else {
			// eslint-disable-next-line no-unused-vars
			const clapStory = await prisma.clap.create({
				data: {
					userId,
					storyId: storyExist.id,
					clapCount: 1,
				},
			})
			return NextResponse.json('Clap created')
		}
	} catch (error) {
		console.log('Error clapping the story', error)
		return NextResponse.error()
	}
}
