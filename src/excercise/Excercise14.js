import React, { createContext, useContext, useState } from "react";
import { dishes } from "../data/dishes";
function Excercise14() {
    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#61dafb",
        },
    }

    //Tạo hook
    const ThemeContext = createContext();

    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState("light");
        const toggleTheme = () => {
            setTheme((currentTheme) =>
                currentTheme === "light" ? "dark" : "light"
            );
        };

        return (
            <ThemeContext.Provider
                value={{
                    theme: themes[theme],
                    themeName: theme,
                    toggleTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

    function Theme() {
        const { theme, themeName, toggleTheme } = useTheme();

        return (
            <div style={{
                color: theme.foreground,
                backgroundColor: theme.background,
                padding: "20px"
            }}>
                <h2>Ex1: Theme</h2>

                <p>Current theme: <strong>{themeName}</strong></p>
                <button
                    onClick={toggleTheme}
                >Change Theme</button>
            </div>
        )
    }

    //custome hook lay themeContent
    function useTheme() {
        return useContext(ThemeContext);
    }


    //=======EX2=======
    const CartContext = createContext();
    // Component hiển thị danh sách món ăn
    function DishesList() {
        const {
            addToCart,
            totalItems,
            totalValue,
        } = useContext(CartContext);

        return (
            <div
                style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            >
                <h2>Exercise 2 + 3: Dishes List</h2>

                {/* Cart summary cập nhật realtime */}
                <div
                    style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                    }}
                >
                    <strong>
                        Cart: {totalItems} item(s) - $
                        {totalValue.toFixed(2)}
                    </strong>
                </div>


                {dishes.map((dish) => (
                    <div
                        key={dish.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>
                            {dish.name}

                            {dish.label && (
                                <span
                                    style={{
                                        marginLeft: "10px",
                                        color: "red",
                                        fontSize: "14px",
                                    }}
                                >
                                    {dish.label}
                                </span>
                            )}
                        </h3>

                        <p>Category: {dish.category}</p>

                        <p>Price: ${dish.price}</p>

                        <p>{dish.description}</p>

                        <button
                            onClick={() => addToCart(dish)}
                            style={{
                                padding: "8px 15px",
                                cursor: "pointer",
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        );
    }


    // Component Cart
    function Cart() {
        const {
            cartItems,
            removeFromCart,
            clearCart,
            totalItems,
            totalValue,
        } = useContext(CartContext);

        return (
            <div
                style={{
                    padding: "20px",
                    border: "2px solid #333",
                    borderRadius: "10px",
                }}
            >
                <h2>Cart</h2>

                {cartItems.length === 0 ? (
                    <p>Cart is empty.</p>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #ddd",
                                    padding: "10px 0",
                                }}
                            >
                                <div>
                                    <strong>{item.name}</strong>

                                    <p>
                                        ${item.price} × {item.quantity}
                                    </p>

                                    <p>
                                        Subtotal: $
                                        {(Number(item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        padding: "7px 12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div
                            style={{
                                marginTop: "20px",
                                padding: "15px",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "5px",
                            }}
                        >
                            <p>
                                <strong>Total items:</strong> {totalItems}
                            </p>

                            <p>
                                <strong>Total value:</strong> $
                                {totalValue.toFixed(2)}
                            </p>

                            <button
                                onClick={clearCart}
                                style={{
                                    padding: "10px 15px",
                                    cursor: "pointer",
                                }}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }
    function CartProvider({ children }) {
        const [cartItems, setCartItems] = useState([]);

        //Thêm vô cart
        const addToCart = (dishes) => {
            setCartItems((currentItems) => {
                const existingItem = currentItems.find(
                    (item) => item.id === dishes.id
                );
                //tồn tại tăng quantity lên 1
                if (existingItem) {
                    return currentItems.map((item) =>
                        item.id === dishes.id ? { ...item, quantity: item.quantity + 1 } : item);
                }
                //xóa khỏi cart
                return [
                    ...currentItems,
                    {
                        ...dishes,
                        quantity: 1
                    },
                ];
            });
        };

        //xóa khỏi cart
        const removeFromCart = (id) => {
            setCartItems((currentItems) =>
                currentItems.filter((item) => item.id !== id)
            )
        }

        //bay card
        const clearCart = () => {
            setCartItems([]);
        }

        //tổng reduce, sum quantiy
        const totalItems = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );


        const totalValue = cartItems.reduce(
            (total, item) =>
                total + Number(item.price) * item.quantity,
            0
, 0 
        );
        return (
            <CartContext.Provider
                value={{
                    cartItems,
                    addToCart,
                    removeFromCart,
                    clearCart,
                    totalItems,
                    totalValue,
                }}
            >
                {children}
            </CartContext.Provider>
        );
    }



    //=======Return
    return (
        <div>
            <h1>Exercise 14 - React Hook (useContext)</h1>

            {/* Exercise 1 */}
            <ThemeProvider>
                <Theme />
            </ThemeProvider>

            <CartProvider>
                <DishesList />
                <Cart />
            </CartProvider>
        </div>
    )
}

export default Excercise14;