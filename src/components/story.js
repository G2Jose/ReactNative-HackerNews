import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from './card.js';
import ScrollView from './scrollView.js';

import { navigationOptions } from '../utils/navigation.js';
import hnapi from '../utils/api.js';

import storiesStore from '../store/stories.js';

class Story extends React.Component {

	static navigationOptions = {
		title: 'React Native Hacker News',
		...navigationOptions,
	};

	componentDidMount() {
		const { id } = this.props.navigation.state.params;
		hnapi.getItem(id).then((story) => {
			storiesStore.updateStory(id, story)
		})
		.catch((error) => console.log('error'));
	}

	render() {
		const { id } = this.props.navigation.state.params;
		return (
			<ScrollView>
				<Card>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>
							{storiesStore.storiesList.find(story => story.id === id).title}
						</Text>
					</View>
				</Card>
			</ScrollView>
		);
	}
}

export default Story;

const styles = StyleSheet.create({
  titleText: {
	fontFamily: 'Helvetica',
	fontSize: 18,
    fontWeight: '500',
  	padding: 1,
  },
  titleContainer: {
	  padding: 10,
  }
});
