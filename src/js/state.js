
import {INITIAL_STATE} from './data/data';

class AppState {
    constructor (state) {
        this.props = state;
    }

    setState (newState) {
        this.props = {...this.props, newState};
    }
}

const appState = new AppState(INITIAL_STATE);

export default appState;
