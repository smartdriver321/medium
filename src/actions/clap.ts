'use server'

import prisma from '@/lib/prisma'
import { getCurrentUserId } from './getStories'

export const clapCount = async (storyId: string, commentId?: string) => {
	try {
		if (!commentId) {
			const clap = await prisma.clap.aggregate({
				where: {
					storyId,
					commentId: null,
				},
				_sum: {
					clapCount: true,
				},
			})

			return clap._sum?.clapCount || 0
		}

		const clap = await prisma.clap.aggregate({
			where: {
				storyId,
				commentId,
			},
			_sum: {
				clapCount: true,
			},
		})

		return clap._sum?.clapCount || 0
	} catch (error) {
		return 0
	}
}

export const clapCountByUser = async (storyId: string, commentId?: string) => {
	const userId = await getCurrentUserId()

	if (!userId) throw new Error('No logged user')

	try {
		if (!commentId) {
			const clap = await prisma.clap.aggregate({
				where: {
					storyId,
					userId,
					commentId: null,
				},
				_sum: {
					clapCount: true,
				},
			})

			return JSON.parse(JSON.stringify(clap._sum?.clapCount || 0))
		}

		const clap = await prisma.clap.aggregate({
			where: {
				storyId,
				userId,
				commentId,
			},
			_sum: {
				clapCount: true,
			},
		})

		return JSON.parse(JSON.stringify(clap._sum?.clapCount || 0))
	} catch (error) {
		return 0
	}
}
