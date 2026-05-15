import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cartItems));
    // }, [cartItems]);

    const addToCart = (product, selectedSize = "M") => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item._id === product._id && item.selectedSize === selectedSize
            );
            if (existingItem) {
                return prev.map((item) =>
                    item._id === product._id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    ...product,
                    selectedSize,
                    quantity: 1,
                    image: product.Image || product.image,
                    name: product.Image_Name || product.name,
                    price: product.Price || product.price,
                },
            ];
        });
    };

    const removeFromCart = (id, selectedSize) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item._id === id && item.selectedSize === selectedSize))
        );
    };

    const updateQuantity = (id, selectedSize, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id && item.selectedSize === selectedSize
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price?.toString().replace(/[^0-9.]/g, "") || 0);
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalCount,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
