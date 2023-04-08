import BooleanExpressionParser from "./BooleanExpressionParser.js";
import BooleanOperations from "./BooleanOperations.js";

const parser = new BooleanExpressionParser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export default class BooleanExpressionVisitor extends BaseCstVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    OPERATORS = {
        "and": "&&",
        "or": "||",
    }

    VALUES = {
        "True": true,
        "False": false,
    }

    expression(ctx) {
        console.log(ctx)
        return this.visit(ctx.equivalenceExpression);
    }

    equivalenceExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, index) => {
                let rhsValue = this.visit(ctx.rhs[index]);
                result = BooleanOperations.equivalence(result, rhsValue);
            });
        }
        return result;
    }

    implicationExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, index) => {
                let rhsValue = this.visit(ctx.rhs[index]);
                result = result = BooleanOperations.implication(result, rhsValue);
            });
        }
        return result;
    }




    orExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, index) => {
                let rhsValue = this.visit(ctx.rhs[index]);
                result = BooleanOperations.or(result, rhsValue);
            });
        }
        return result;
    }


    andExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, index) => {
                let rhsValue = this.visit(ctx.rhs[index]);
                result = BooleanOperations.and(result, rhsValue);
            });
        }
        return result;
    }

    atomicExpression(ctx) {
        if (ctx.parenthesisExpression) {
            return this.visit(ctx.parenthesisExpression)
        }
        else if (ctx.booleanValue) {
            return this.visit(ctx.booleanValue)
        }
        else if (ctx.notExpr) {
            return this.visit(ctx.notExpr)
        }
    }

    parenthesisExpression(ctx) {
        return this.visit(ctx.expression);
    }

    notExpr(ctx) {
        return !this.visit(ctx.expression)
    }

    booleanValue(ctx) {
        const value = ctx.BooleanValue[0].image;
        if (parseInt(value)) {
            return Boolean(value);
        } else {
            return value.toLowerCase() === "true"
        }
    }
}