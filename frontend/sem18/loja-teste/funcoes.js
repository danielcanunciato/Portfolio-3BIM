function calcularTotal(preco, quantidade) {
    return preco * quantidade;
}

if (typeof module !== "undefined") {
    module.exports = { calcularTotal };
}