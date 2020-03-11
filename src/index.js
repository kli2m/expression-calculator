function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if (expr.length < 1) return expr;
    let array = expr.split(" ").join("").split(/(\d*)\s*([-+/*()])/).filter(v => v != "")

    function plus(a, b) {
        return Number(a) + Number(b)
    }

    function minus(a, b) {
        return a - b
    }

    function multipl(a, b) {
        return a * b
    }

    function devision(a, b) {
        if (b === "0") throw Error("TypeError: Division by zero.")
        return a / b
    }

    function counting(arr) {
        let indexM = arr.indexOf("*")
        let indexD = arr.indexOf("/")
        let indexP = arr.indexOf("+")
        let indexMin = arr.indexOf("-")

        if (indexM !== -1 && indexD !== -1) {
            if (indexM > indexD) {
                arr.splice((indexD - 1), 3, devision(arr[indexD - 1], arr[indexD + 1]))
                return counting(arr)
            } else {
                arr.splice((indexM - 1), 3, multipl(arr[indexM - 1], arr[indexM + 1]))
                return counting(arr)
            }
        } else if (indexD !== -1) {
            arr.splice((indexD - 1), 3, devision(arr[indexD - 1], arr[indexD + 1]))
            return counting(arr)
        } else if (indexM !== -1) {
            arr.splice((indexM - 1), 3, multipl(arr[indexM - 1], arr[indexM + 1]))
            return counting(arr)
        } else if (indexP !== -1 && indexMin !== -1) {
            if (indexP > indexMin) {
                arr.splice((indexMin - 1), 3, minus(arr[indexMin - 1], arr[indexMin + 1]))
                return counting(arr)
            } else {
                arr.splice((indexP - 1), 3, plus(arr[indexP - 1], arr[indexP + 1]))
                return counting(arr)
            }
        } else if (indexP !== -1) {
            arr.splice((indexP - 1), 3, plus(arr[indexP - 1], arr[indexP + 1]))
            return counting(arr)
        } else if (indexMin !== -1) {
            arr.splice((indexMin - 1), 3, minus(arr[indexMin - 1], arr[indexMin + 1]))
            return counting(arr)
        } else return arr
    }

    function scopesFind(arr) {
        let indLeftScope = arr.lastIndexOf("(")
        let indRightScope = -1
        for (let i = indLeftScope; i < array.length; i++) {
            if (arr[i] === ")") {
                indRightScope = i
                break
            }
        }

        if ((indLeftScope === -1 && indRightScope !== -1) || (indLeftScope !== -1 && indRightScope === -1) || (indLeftScope === -1 && indRightScope !== -1) || (indLeftScope > indRightScope))
            throw Error("ExpressionError: Brackets must be paired")

        if (indLeftScope !== -1 && indRightScope !== -1) {
            let temp = arr.slice(indLeftScope + 1, indRightScope);
            arr.splice(indLeftScope, (indRightScope - indLeftScope + 1), scopesFind(temp))
            return scopesFind(arr)
        } else return counting(arr)
    }

    function calc(array) {
        if (array.indexOf("(") === -1 && array.indexOf(")") === -1) return counting(array)
        else return scopesFind(array)
    }

    return Number(calc(array))
}

module.exports = {
    expressionCalculator
}