import { User } from '@clerk/nextjs/server'

import { getPublishedStoryById } from '@/actions/getStories'
import { getUser } from '@/actions/user'
import Navbar from '@/components/Navbar'
import RenderStory from '../RenderStory'

export default async function page({
	params,
}: {
	params: { storyId: string }
}) {
	const publishedStory = await getPublishedStoryById(params.storyId)

	console.log(publishedStory)

	if (!publishedStory.response) {
		return <div>No Stories were found</div>
	}

	const author: User = await getUser(publishedStory.response?.authorId)

	return (
		<div>
			<Navbar />
			<RenderStory
				authorFirstName={author.firstName}
				authorImage={author.imageUrl}
				authorLastName={author.lastName}
				publishedStory={publishedStory.response}
			/>
		</div>
	)
}
