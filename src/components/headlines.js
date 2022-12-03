import React from 'react';
import { observer } from 'mobx-react/native';
import { ScrollView, Text, StyleSheet } from 'react-native';
import hnapi from '../utils/api.js';

import Card from './card.js';

@observer
class Headlines extends React.Component {

	componentDidMount() {
		hnapi.getTopStories().then(response => this.props.storiesStore.updateStories(response.data));
	}

	render() {
		const { storiesStore } = this.props;
		return (
			<ScrollView style={styles.scrollView}>
			{
				storiesStore && storiesStore.storiesList && storiesStore.storiesList.map((story, i) => {
					return <Card key={i} title={story.title} points={story.points} />
				})
			}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
		backgroundColor: 'orange',
		paddingLeft: 10,
		paddingRight: 10,
  },
});

export default Headlines;
