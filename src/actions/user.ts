'use server'

import { auth, clerkClient } from '@clerk/nextjs'

export const getCurrentUser = async () => {
	const { userId } = auth()

	if (!userId) throw new Error('No current user found')

	const user = await clerkClient.users.getUser(userId)

	return JSON.parse(JSON.stringify(user))
}
