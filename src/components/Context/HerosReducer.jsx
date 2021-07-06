
export default function (state, action) {
    const { payload, type } = action;

    switch (type) {
        case 'GET_HEROS':
            return {
                ...state,
                heros: payload
            };
        case 'GET_POWERSTATS':
            return {
                ...state,
                powerstats: payload
            }
        default:
            return state

    }
}