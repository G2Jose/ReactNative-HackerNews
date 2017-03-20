import React from 'react';
import { observer } from 'mobx-react/native';
import { Text, StyleSheet } from 'react-native';
import hnapi from '../utils/api.js';

import Headline from './headline.js';
import ScrollView from './scrollView.js';

@observer
class Headlines extends React.Component {

	componentDidMount() {
		hnapi.getTopStories().then(response => this.props.storiesStore.updateStories(response.data));
	}

	render() {
		const { storiesStore, navigateToStory } = this.props;
		return (
			<ScrollView>
			{
				storiesStore && storiesStore.storiesList && storiesStore.storiesList.map((story, i) => {
					return (
						<Headline
							key={i} title={story.title} points={story.points}
							onPress={() => navigateToStory(story.id)}
						/>
					);
				})
			}
			</ScrollView>
		);
	}
}

export default Headlines;
