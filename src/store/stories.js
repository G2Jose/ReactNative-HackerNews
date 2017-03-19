import {observable, autorun} from 'mobx';

class Stories {
	@observable loadedDate: null;
	@observable isLoading: false;
	@observable storiesList: [];

	constructor() {
		autorun(() => console.log(this.storiesList));
	}

	updateStories(stories) {
		this.storiesList = stories;
	}
}

const storiesStore = new Stories();

export default storiesStore;