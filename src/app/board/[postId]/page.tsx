const PostDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>PostDetail: {id}</div>;
};
export default PostDetail;
