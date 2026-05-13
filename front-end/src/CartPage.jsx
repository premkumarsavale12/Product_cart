import {
    FaTrash,
    FaMinus,
    FaPlus,
    FaShoppingBag,
    FaArrowLeft,
    FaLock,
    FaTruck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

export default function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="text-4xl text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-400 max-w-sm">
                    Looks like you haven't added anything yet. Browse our products and
                    find something you'll love!
                </p>
                <Link
                    to="/"
                    className="mt-2 bg-black text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20 flex items-center gap-2"
                >
                    <FaArrowLeft size={14} />
                    Continue Shopping
                </Link>
            </div>
        );
    }
    const deliveryFee = totalPrice >= 499 ? 0 : 49;
    const savings = Math.round(totalPrice * 0.1);

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {totalCount} {totalCount === 1 ? "item" : "items"} in your cart
                    </p>
                </div>
                <Link
                    to="/"
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
                >
                    <FaArrowLeft size={12} />
                    Continue Shopping
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4">
                    {totalPrice < 499 && (
                        <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3 text-sm text-indigo-700 font-medium">
                            <FaTruck className="text-indigo-500 flex-shrink-0" />
                            Add ₹{(499 - totalPrice).toFixed(0)} more for{" "}
                            <span className="font-bold">FREE delivery!</span>
                        </div>
                    )}
                    {totalPrice >= 499 && (
                        <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-5 py-3 text-sm text-green-700 font-medium">
                            <FaTruck className="text-green-500 flex-shrink-0" />
                            🎉 You've unlocked <span className="font-bold ml-1">FREE delivery!</span>
                        </div>
                    )}
                    {cartItems.map((item) => (
                        <div
                            key={`${item._id}-${item.selectedSize}`}
                            className="flex gap-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                     loading="lazy"
                                    className="w-full h-full object-contain p-2"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/100?text=No+Image";
                                    }}
                                />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 leading-snug">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                                            {item.selectedSize}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item._id,
                                                    item.selectedSize,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-3 py-2 hover:bg-gray-200 text-gray-600 transition-colors"
                                        >
                                            <FaMinus size={11} />
                                        </button>
                                        <span className="px-4 text-sm font-bold text-gray-800 min-w-[2rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item._id,
                                                    item.selectedSize,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-3 py-2 hover:bg-gray-200 text-gray-600 transition-colors"
                                        >
                                            <FaPlus size={11} />
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-black text-gray-900 text-lg">
                                            ₹
                                            {(
                                                parseFloat(
                                                    item.price?.toString().replace(/[^0-9.]/g, "") || 0
                                                ) * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p className="text-xs text-gray-400">
                                                ₹
                                                {parseFloat(
                                                    item.price?.toString().replace(/[^0-9.]/g, "") || 0
                                                ).toFixed(2)}{" "}
                                                each
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id, item.selectedSize)}
                                className="self-start p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove item"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={clearCart}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium text-left w-fit mt-2"
                    >
                        🗑 Clear entire cart
                    </button>
                </div>
                <div className="w-full lg:w-[360px] flex-shrink-0">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                            Order Summary
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal ({totalCount} items)</span>
                                <span className="font-medium text-gray-800">
                                    ₹{totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery Fee</span>
                                <span
                                    className={
                                        deliveryFee === 0
                                            ? "text-green-600 font-semibold"
                                            : "text-gray-800 font-medium"
                                    }
                                >
                                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>You Save</span>
                                <span>- ₹{savings}</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-black text-gray-900 text-lg border-t border-gray-100 pt-4">
                            <span>Total</span>
                            <span>₹{(totalPrice + deliveryFee).toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 mt-2">
                            <FaLock size={13} />
                            Secure Checkout
                        </button>

                        <div className="flex justify-center gap-6 mt-3 text-gray-300 text-xs">
                            <span className="flex items-center gap-1.5">
                                <FaLock size={11} /> Secure
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FaTruck size={11} /> Fast Delivery
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}