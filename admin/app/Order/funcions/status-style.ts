export const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "border-red-500 text-black bg-white";
    case "DELIVERED":
      return "border-green-500 text-black bg-white";
    case "CANCELED":
      return "border-gray-500 text-black bg-white";
    default:
      return "border-gray-500";
  }
};
