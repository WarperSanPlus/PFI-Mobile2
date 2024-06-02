const clampQuantity = (quantity) => {
    if (quantity < 1)
        quantity = 1;

    if (quantity > 99)
        quantity = 99;

    return quantity;
}

export { clampQuantity }
