
export function balance (state,data) {
    state.balance = data[0].balance
    state.currency = data[0].currency
}