import Navbar from '@/components/Navbar'
import NewStory from '../NewStory'

export default function page({ params }: { params: { storyId: string } }) {
	console.log(params.storyId)

	return (
		<div className='max-w-[1000px] mx-auto ' role='textbox' data-length>
			<Navbar />
			<NewStory />
		</div>
	)
}
