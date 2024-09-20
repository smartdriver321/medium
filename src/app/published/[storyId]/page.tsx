export default function page({ params }: { params: { storyId: string } }) {
	return <div>{params.storyId}</div>
}
