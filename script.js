const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = ""; // Chuỗi biểu thức lưu toàn bộ phép toán

// Hàm thay thế ký hiệu đặc biệt thành các hàm JavaScript
function parseExpression(expr) {
    // Lũy thừa
    expr = expr.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => `Math.pow(${base},${exponent})`);
    // Căn bậc hai
    expr = expr.replace(/√(\d+(\.\d+)?)/g, (match, number) => `Math.sqrt(${number})`);
    // Logarit cơ số 10
    expr = expr.replace(/log\(([^)]+)\)/g, (match, number) => `Math.log10(${number})`);
    // Logarit tự nhiên
    expr = expr.replace(/ln\(([^)]+)\)/g, (match, number) => `Math.log(${number})`);
    // Hàm sin, cos, tan
    expr = expr.replace(/sin\(([^)]+)\)/g, (match, angle) => `Math.sin(${angle} * Math.PI / 180)`);
    expr = expr.replace(/cos\(([^)]+)\)/g, (match, angle) => `Math.cos(${angle} * Math.PI / 180)`);
    expr = expr.replace(/tan\(([^)]+)\)/g, (match, angle) => `Math.tan(${angle} * Math.PI / 180)`);
    return expr;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "C") {
            // Xóa toàn bộ biểu thức và hiển thị
            expression = "";
            display.textContent = "0";
        } else if (value === "=") {
            // Tính toán biểu thức
            try {
                const parsedExpression = parseExpression(expression); // Chuyển đổi ký hiệu đặc biệt
                expression = eval(parsedExpression).toString(); // Tính toán biểu thức
                display.textContent = expression;
            } catch {
                display.textContent = "Error"; // Xử lý lỗi biểu thức không hợp lệ
                expression = "";
            }
        } else {
            // Thêm giá trị vào biểu thức và hiển thị
            expression += value;
            display.textContent = expression;
        }
    });
});
