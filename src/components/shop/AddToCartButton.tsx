"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = items.find((i) => i.productId === productId)?.quantity ?? 0;
  const isSoldOut = stock !== -1 && inCart >= stock;

  function handleAdd() {
    if (isSoldOut) return;
    addItem(productId);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isSoldOut}
      style={{
        width: "100%",
        padding: "18px",
        background: isSoldOut ? "var(--ink-mute)" : justAdded ? "var(--moss)" : "var(--ink)",
        color: "var(--paper)",
        border: "none",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        cursor: isSoldOut ? "not-allowed" : "pointer",
        transition: "background 0.3s",
        marginBottom: "12px",
      }}
    >
      {isSoldOut ? "Sold Out" : justAdded ? "Added ✓" : "Add to Cart →"}
    </button>
  );
}
