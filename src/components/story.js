import React from 'react';
import { StyleSheet, Text, View, RefreshControl, Linking } from 'react-native';
import { observer } from 'mobx-react/native';

import Card from './card.js';
import ScrollView from './scrollView.js';
import Comments from './comments.js';

import {loadingParams} from '../utils/animation.js';
import { navigationOptions } from '../utils/navigation.js';
import hnapi from '../utils/api.js';

import storiesStore from '../store/stories.js';

@observer
class Story extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: true,
		};
	}

	static navigationOptions = {
		title: 'React Native Hacker News',
		...navigationOptions,
	};

	_updateStory = (id, cb) => {
		hnapi.getItem(id).then((story) => {
			storiesStore.updateStory(id, story);
			if (cb && typeof cb === 'function')
				cb();
		})
		.catch((error) => console.log('error'));
	}

	componentDidMount() {
		const { id } = this.props.navigation.state.params;
		this._updateStory(id, setTimeout(() => this.setState({refreshing: false}), loadingParams.commentLoadDuration/2));
	}

	_onRefresh = (id) => {
		this.setState({
			refreshing: true,
		});
		this._updateStory(id, setTimeout(() => this.setState({refreshing: false}), loadingParams.commentLoadDuration));
	}

	render() {
		const { id } = this.props.navigation.state.params;
		const story = storiesStore.storiesList.find(story => story.id === id);
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={() => this._onRefresh(id)}
					/>
				}
			>
				<Card>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>
							{story.title}
						</Text>
						<Text
							style={styles.link}
							onPress={() => Linking.openURL(story.url)}
						>
							{`↗️${story.url}`}
						</Text>
					</View>
				</Card>
				<Comments loading={this.state.refreshing} item={story && story.content && story.content.data} />
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
  },
  link: {
  	fontFamily: 'Helvetica',
  	color: 'blue',
  	padding: 1,
  },
});
