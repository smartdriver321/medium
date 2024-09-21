'use server'

import { auth } from '@clerk/nextjs'

import prisma from '@/lib/prisma'

export const getCurrentUserId = async () => {
	const { userId } = auth()
	return userId
}

export const getStoryById = async (storyId: string) => {
	if (!storyId) {
		throw new Error('Do not have storyId')
	}

	try {
		const storyById = await prisma.story.findUnique({
			where: {
				id: storyId,
				publish: false,
			},
		})

		return { response: storyById }
	} catch (error) {
		return { error: 'Error on getting the story by Id' }
	}
}

export const getPublishedStoryById = async (storyId: string) => {
	if (!storyId) {
		throw new Error('Do not have storyId')
	}

	try {
		const storyById = await prisma.story.findUnique({
			where: {
				id: storyId,
				publish: true,
			},
		})

		return { response: storyById }
	} catch (error) {
		return { error: 'Error on getting the story by Id' }
	}
}
