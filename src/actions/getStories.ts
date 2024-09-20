'use server'

import prisma from '@/lib/prisma'

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
