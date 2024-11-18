import EditForm from "./editForm";

export default async function Page({ params }) {
  const { productId } = await params;
  return (
    <div>
      <EditForm productId={productId} />
    </div>
  );
}
