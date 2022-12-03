import {observable, autorun} from 'mobx';

const createStory = (storyData) => ({
	id: storyData.id,
	title: storyData.title,
	points: storyData.points,
	content: null,
	url: storyData.url,
});

class Stories {
	@observable loadedDate: null;
	@observable isLoading: false;
	@observable storiesList: [];

	constructor() {
		autorun(() => console.log('updated stories'));
	}

	updateStories(stories) {
		this.storiesList = stories.map(createStory);
	}

	updateStory(id, story) {
		const index = this.storiesList.findIndex(story => story.id === id);
		if (index !== -1) {
			this.storiesList[index]['content'] = story;
		}
	}
}

const storiesStore = new Stories();

export default storiesStore;