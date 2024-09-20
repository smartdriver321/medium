import Navbar from '@/components/Navbar'

export default function page({ params }: { params: { storyId: string } }) {
	console.log(params.storyId)

	return (
		<div>
			<Navbar />
		</div>
	)
}
