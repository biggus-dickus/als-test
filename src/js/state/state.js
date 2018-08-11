import {INITIAL_STATE} from '../data/data';

class AppState {
    constructor (props) {
        this.state = props;
    }

    setState (newState) {
        this.state = newState;
    }

    /**
     * Push new tint to tints array.
     * @param {Object} tint
     */
    addTint (tint) {
        const newState = {...this.state};
        const newTints = newState.colors.blue;

        newTints.push(tint);
        this.setState(newState);
    }

    /**
     * Remove the specified tint from appState array.
     * @param {int} index
     */
    removeTint (index) {
        const newState = {...this.state};
        const newTints = newState.colors.blue;

        newTints.splice(index, 1);
        this.setState(newState);
    }

    removeAllTints () {
        const newState = {...this.state};
        const newTints = newState.colors.blue;

        newTints.length = 0;
        this.setState(newState);
    }

    /**
     * Check or uncheck all tints in the appState.
     * @param {boolean} flag
     */
    toggleAllTints (flag) {
        const newState = {...this.state};
        const newTints = newState.colors.blue;

        newTints.forEach((color) => color.isChecked = flag);
        this.setState(newState);
    }

    /**
     * Change the specified tint value.
     * @param {int|string} index
     * @param {string} propName
     * @param {*} newValue
     */
    changeValue (index, propName, newValue) {
        const newState = {...this.state};
        const newTints = newState.colors.blue;

        newTints[index][propName] = newValue;
        this.setState(newState);
    }
}

export default new AppState(INITIAL_STATE);
