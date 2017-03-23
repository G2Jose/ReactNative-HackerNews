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
					<View style={styles.pointsContainer}>
						<Text style={styles.points}>{story.points || '0'}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.titleText}>
							{story.title}
						</Text>
						<Text
							style={styles.link}
							onPress={() => Linking.openURL(story.url)}
						>
							{story.url}
						</Text>
						<View style={styles.info}>
							<View style={styles.infoContainer}><Text style={styles.infoText}>{story.timeAgo}</Text></View>
							<View style={styles.infoContainer}><Text style={styles.infoText}>{`${story.commentCount} comments`}</Text></View>
							<View style={styles.infoContainer}><Text style={styles.infoText}>{story.author}</Text></View>
						</View>
					</View>
				</Card>
				<Comments loading={this.state.refreshing} item={story && story.content && story.content.data} />
			</ScrollView>
		);
	}
}

export default Story;

const styles = StyleSheet.create({
   info: {
	flexDirection: 'row',
	flex: 1,
	borderTopColor: 'grey',
	borderTopWidth: StyleSheet.hairlineWidth,
	marginTop: 3,
	paddingTop: 3,
  },
  infoContainer: {
	flex: 1,
	alignItems: 'center',
  },
  infoText: {
	fontSize: 14,
  },
  content: {
  	flex: 6,
  	flexDirection: 'column',
  },
  titleText: {
	fontSize: 18,
    fontWeight: '500',
  	padding: 1,
  },
  link: {
  	color: 'blue',
  	padding: 1,
  },
  pointsContainer: {
  	flex: 1,
  	alignItems: 'center',
  	paddingRight: 5.5,
  },
  points: {
    fontWeight: 'bold',
	fontSize: 18,
  },
});
