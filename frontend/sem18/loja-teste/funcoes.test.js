const { calcularTotal } = require('./funcoes');

test('deve calcular o total da compra corretamente', () => {
    expect(calcularTotal(100, 2)).toBe(200);
});