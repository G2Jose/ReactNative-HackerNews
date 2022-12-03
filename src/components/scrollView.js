import React from 'react';
import { ScrollView as SV, StyleSheet, View } from 'react-native';

const ScrollView = ({ children, ...rest }) => {
	return (
		<SV
			style={styles.scrollView}
			{...rest}
		>
			<View style={{marginBottom: 10}}>
				{children}
			</View>
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
