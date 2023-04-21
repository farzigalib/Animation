import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('window');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const CIRCLE_SIZE = 100;
const DURATION = 1000;

const Circle = ({onPress, index, animatedValue, animatedValue2}) => {
  const {initialBgColor, nextBgColor, bgColor} = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backGroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const btnBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {backgroundColor: backGroundColor},
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: btnBgColor,
            transform: [
              {
                perspective: 200,
              },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },
              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.circle,
              styles.circleButton,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '189deg'],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.5, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}>
            <AnimatedAntDesign name="arrowright" size={28} color={'white'} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const colors = [
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: '#222',
  },
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: 'yellowgreen',
  },
  {
    initialBgColor: '#222',
    bgColor: 'yellowgreen',
    nextBgColor: 'midnightblue',
  },
  {
    initialBgColor: 'yellowgreen',
    bgColor: 'midnightblue',
    nextBgColor: 'turquoise',
  },
  {
    initialBgColor: 'midnightblue',
    bgColor: 'turquoise',
    nextBgColor: 'goldenrod',
  },
  {
    initialBgColor: 'turquoise',
    bgColor: 'goldenrod',
    nextBgColor: '#222',
  },
];

const textData = [
  {
    text: 'Hello',
  },
  {
    text: 'Everyone',
  },
  {
    text: 'MySelf',
  },
  {
    text: 'Himanshu Joshi',
  },
  {
    text: `Thanks for\nWatching`,
  },
  {
    text: '<*.BURGIIR.*>',
  },
];

export default function MultiColor() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const inputRange = [...Array(textData.length).keys()];

  const animation = i =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: DURATION * 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animation((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Circle
        onPress={onPress}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
        index={index}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: textData.map((_, i) => -i * width),
              }),
            },
          ],
        }}>
        {textData.slice(0, colors.length).map(({text}, i) => {
          return (
            <View key={i} style={styles.textContainer}>
              <Text style={[styles.text, {color: colors[i].nextBgColor}]}>
                {text}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '50%',
    width: '100%',
  },
  text: {
    fontSize: 40,
    fontWeight: '500',
  },
});
