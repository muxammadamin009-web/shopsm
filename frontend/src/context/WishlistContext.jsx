import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      setWishlist(
        wishlist.filter((item) => item._id !== product._id)
      );
    } else {
      setWishlist([...wishlist, product]);
    }

  };

  const isLiked = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isLiked,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );

}

export default WishlistProvider;