import { getStoryById } from '@/actions/getStories'
import { getCurrentUser } from '@/actions/user'
import NavbarStory from '../NavbarStory'
import NewStory from '../NewStory'

export default async function page({
	params,
}: {
	params: { storyId: string }
}) {
	const story = await getStoryById(params.storyId)
	const user = await getCurrentUser()

	return (
		<div className='max-w-[1000px] mx-auto ' role='textbox' data-length>
			<NavbarStory
				storyId={params.storyId}
				currentUserId={user.id}
				currentUserFirstName={user?.firstName || ''}
				currentUserLastName={user?.lastName || ''}
			/>
			<NewStory
				storyId={params.storyId}
				storyContent={story.response?.content}
			/>
		</div>
	)
}
