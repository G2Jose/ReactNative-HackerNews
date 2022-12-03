import { Animated } from 'react-native';

const createRepeatingFadeAnimation = (state, duration, from, to, iterations) => {
	const animatedTimings = [];
	for (let i = 0; i < iterations; i = i + 1) {
		animatedTimings.push(
			Animated.timing(
				state,
				{toValue: to, duration: duration }
			)
		);
		const tempFrom = from;
		from = to;
		to = tempFrom;
	}
	return Animated.sequence(animatedTimings);
}
const loadingParams = {
	iterations: 10,
	minOpacity: 0.3,
	maxOpacity: 0.7,
	iterationDuration: 500,
	totalDuration: 2000,
};

export {
	createRepeatingFadeAnimation,
	loadingParams,
};
