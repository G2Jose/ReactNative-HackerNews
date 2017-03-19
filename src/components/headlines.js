import React from 'react';
import { observer } from 'mobx-react/native';
import { ScrollView, Text, StyleSheet } from 'react-native';

import Card from './card.js';

const Headlines = observer(({ storiesStore }) => (
	<ScrollView style={styles.scrollView}>
	{
		storiesStore && storiesStore.storiesList && storiesStore.storiesList.map((story, i) => {
			return <Card key={i} title={story.title} points={story.points} />
		})
	}
	</ScrollView>
	)
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default Headlines;
