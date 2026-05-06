import { createContext, useContext, useEffect, useState } from "react";
// import api from "../utils/api";


const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlistItems, setWishlistItems] = useState([]);

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("token");
            if (token && !isInitialized) {
                try {
                    const res = await api.get("/auth/wishlist");
                    setWishlistItems(res.data || []);
                    setIsInitialized(true);
                } catch (error) {
                    console.error("Failed to fetch wishlist", error);
                }
            }
        };
        fetchWishlist();
    }, [isInitialized]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isInitialized) {
            api.post("/auth/wishlist", { wishlistItems }).catch(err => console.error(err));
        }
    }, [wishlistItems, isInitialized]);

    const toggleWishlist = (product) => {
        const id = product._id || product.id;
        setWishlistItems((prev) => {
            const existing = prev.find((item) => item._id === id);
            if (existing) {
                return prev.filter((item) => item._id !== id);
            }
            return [
                ...prev,
                {
                    _id: id,
                    name: product.Image_Name || product.name,
                    image: product.Image || product.image,
                    price: product.Price || product.price,
                },
            ];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item._id !== id));
    };

    const isInWishlist = (id) => {
        return wishlistItems.some((item) => item._id === id);
    };

    const totalWishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                toggleWishlist,
                removeFromWishlist,
                isInWishlist,
                totalWishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
