import React from 'react';
import { ScrollView as SV, StyleSheet } from 'react-native';

const ScrollView = ({ children }) => {
	return (
		<SV style={styles.scrollView}>
			{children}
		</SV>
	);
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
		backgroundColor: 'orange',
		paddingLeft: 10,
		paddingRight: 10,
  },
});

export default ScrollView;
