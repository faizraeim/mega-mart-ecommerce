import { IoMdClose } from "react-icons/io";

function DetailModal({ data, isOpen, onClose }) {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Product Images */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Images</h3>
          <div className="flex gap-3 overflow-x-auto">
            {data.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-24 h-24 rounded-lg object-cover"
              />
            ))}
          </div>
        </section>

        {/* Basic Info */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Basic Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Description" value={data.description} />
            <Detail label="SKU" value={data.sku} />
            <Detail label="Brand" value={data.brand} />
            <Detail label="Category" value={data.category} />
            <Detail label="Tags" value={data.tags?.join(", ")} />
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Pricing</h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Price" value={`$${data.price}`} />
            <Detail label="Discount" value={`${data.discountPercentage}%`} />
            <Detail label="Min Order Qty" value={data.minimumOrderQuantity} />
          </div>
        </section>

        {/* Physical Details */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Physical Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Weight" value={`${data.weight}kg`} />
            <Detail label="Width" value={data.dimensions?.width} />
            <Detail label="Height" value={data.dimensions?.height} />
            <Detail label="Depth" value={data.dimensions?.depth} />
          </div>
        </section>

        {/* Policies */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">
            Policies & Shipping
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Warranty" value={data.warrantyInformation} />
            <Detail label="Shipping" value={data.shippingInformation} />
            <Detail label="Return Policy" value={data.returnPolicy} />
          </div>
        </section>

        {/* Meta */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Meta</h3>
          <div className="grid grid-cols-2 gap-4">
            <Detail label="Created At" value={data.meta?.createdAt} />
            <Detail label="Updated At" value={data.meta?.updatedAt} />
            <Detail label="Barcode" value={data.meta?.barcode} />
            <Detail label="QR Code" value={<img src={data.meta?.qrcode} className="w-24 h-24"/>} />
          </div>
        </section>
      </div>
    </div>
  );
}
export default DetailModal;

// Reusable detail row
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-sm font-medium text-gray-900">{value || "N/A"}</p>
  </div>
);
