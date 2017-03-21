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
	from: 0.1,
	to: 1.0,
	durationPerIteration: 500,
	totalDuration: 1500,
};

export {
	createRepeatingFadeAnimation,
	loadingParams,
};
