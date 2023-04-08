import React, { useEffect, useState } from 'react'
import { allTokens } from '../parser/tokens'
import { Lexer } from "chevrotain";
import BooleanExpressionVisitor from '../parser/BooleanExpressionVisitor';
import BooleanExpressionParser from '../parser/BooleanExpressionParser';


const lexer = new Lexer(allTokens);
const parser = new BooleanExpressionParser();
const visitor = new BooleanExpressionVisitor();

const BooleanAlgebraSolverForm = () => {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    useEffect((() => {
        const { tokens } = lexer.tokenize(input);
        parser.input = tokens;
        const cst = parser.expression();
        let res = visitor.visit(cst);
        if (res == null) {
            res = "Can't parse";
        } else {
            res = res ? "TRUE" : "FALSE";
        }
        setResult(res);
    }), [input])

    return (
        <div className='max-auto w-100 mt-3'>
            <form className='mx-auto w-50'>
                <h5 className="text-center">Boolean Algebra Solver</h5>
                <div className="form-group">
                    <label htmlFor="expression">Enter Expression</label>
                    <input
                        className='mt-3 form-control'
                        placeholder='Expression...'
                        id="expression"
                        name='expression'
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <p className='mt-3 alert alert-primary'><b>{result}</b></p>
                <p className='alert alert-info'>
                    Allowed boolean values:
                    <ul>
                        <li>
                            <b>True</b>: (True, true, 1)
                        </li>
                        <li>
                            <b>False</b>: (False, false, 0)
                        </li>
                    </ul>
                    <span>Allowed boolean algebra operators:</span>
                    <ul>
                        <li>
                            <b>Inversion</b>: not(#expression#)
                        </li>
                        <li>
                            <b>Konjunction</b>: and
                        </li>
                        <li>
                            <b>Disjunction</b>: or
                        </li>
                        <li>
                            <b>implication</b>: ={'>'}
                        </li>
                        <li>
                            <b>equivalence</b>: {'<'}={'>'}
                        </li>
                    </ul>
                    <p>
                        Use parentheses "<b>( )</b>" to set precedence
                    </p>
                </p>
            </form>
        </div>
    )
}

export default BooleanAlgebraSolverForm