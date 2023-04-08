import { Lexer, createToken } from "chevrotain";

export const BooleanValue = createToken({ name: "BooleanValue", pattern: Lexer.NA, });
export const True = createToken({ name: "True", pattern: /True|true|1/, categories: BooleanValue, });
export const False = createToken({ name: "False", pattern: /False|false|0/, categories: BooleanValue, });
export const And = createToken({ name: "And", pattern: /and/ });
export const Or = createToken({ name: "Or", pattern: /or/ });
export const Implication = createToken({ name: "implication", pattern: /=>/ });
export const Equivalence = createToken({ name: "equivalence", pattern: /<=>/ });
export const Whitespace = createToken({ name: "Whitespace", pattern: /\s+/, line_breaks: true, group: Lexer.SKIPPED, });
export const Not = createToken({ name: "Not", pattern: /not/ });
export const LParen = createToken({ name: "LParen", pattern: /\(/, });
export const RParen = createToken({ name: "RParen", pattern: /\)/, });

export const allTokens = [
    Whitespace,
    Not,
    True,
    False,
    And,
    Or,
    Implication,
    Equivalence,
    LParen,
    RParen,
    BooleanValue,
];

