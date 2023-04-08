import { CstParser } from "chevrotain";
import { allTokens, Not, BooleanValue, LParen, RParen, And, Or, Implication, Equivalence, } from "./tokens.js";

export default class BooleanExpressionParser extends CstParser {
    constructor() {
        super(allTokens);
        const $ = this;

        $.RULE("expression", () => {
            $.SUBRULE($.equivalenceExpression)
        });

        $.RULE("equivalenceExpression", () => {
            $.SUBRULE($.implicationExpression, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(Equivalence);
                $.SUBRULE2($.implicationExpression, { LABEL: "rhs" });
            });
        });

        $.RULE("implicationExpression", () => {
            $.SUBRULE($.orExpression, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(Implication);
                $.SUBRULE2($.orExpression, { LABEL: "rhs" });
            });
        });

        $.RULE("orExpression", () => {
            $.SUBRULE($.andExpression, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(Or);
                $.SUBRULE2($.andExpression, { LABEL: "rhs" });
            });
        });

        $.RULE("andExpression", () => {
            $.SUBRULE($.atomicExpression, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(And);
                $.SUBRULE2($.atomicExpression, { LABEL: "rhs" });
            });
        });

        $.RULE("atomicExpression", () => $.OR([
            { ALT: () => $.SUBRULE($.parenthesisExpression) },
            { ALT: () => $.SUBRULE($.booleanValue) },
            { ALT: () => $.SUBRULE($.notExpr) },
        ]));


        $.RULE("parenthesisExpression", () => {
            $.CONSUME(LParen);
            $.SUBRULE($.expression);
            $.CONSUME(RParen);
        });

        $.RULE("notExpr", () => {
            $.CONSUME(Not);
            $.CONSUME(LParen);
            $.SUBRULE($.expression);
            $.CONSUME(RParen);
        });


        $.RULE("booleanValue", () => {
            $.CONSUME(BooleanValue);
        });


        $.performSelfAnalysis();
    }
}