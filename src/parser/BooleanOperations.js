
export default class BooleanOperations {
    static implication(A, B) {
        if (A) { return B; }
        else { return true; }
    }

    static equivalence(A, B) {
        return A === B;
    }

    static or(A, B) {
        return A || B;
    }

    static and(A, B) {
        return A && B;
    }
}
