import {INITIAL_STATE} from '../data/data';

class AppState {
    constructor (state) {
        this.props = state;
    }

    setState (newState) {
        this.props = newState;
    }
}

export default new AppState(INITIAL_STATE);
