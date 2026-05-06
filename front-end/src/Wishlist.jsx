import { Link } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">Your Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 text-gray-500 py-10">
                    <p className="text-xl">Your wishlist is empty.</p>
                    <Link to="/home" className="text-indigo-600 font-semibold hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
                            <div className="relative aspect-[4/5] bg-gray-100 p-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <button
                                    onClick={() => removeFromWishlist(item._id)}
                                    className="absolute top-3 right-3 p-2 bg-white text-red-500 rounded-full shadow hover:bg-red-500 hover:text-white transition-colors"
                                    title="Remove from Wishlist"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="font-semibold text-sm truncate" title={item.name}>{item.name}</h3>
                                <p className="text-gray-700 font-bold">{item.price}</p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="mt-2 w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                                >
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
