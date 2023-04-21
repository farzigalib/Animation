import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {githubLogo} from '../assets/image';
import Home from './Home';
import {COLORS} from '../assets/color';

const BGColor = '#ffccdd';

const SplashScreen = ({navigation}) => {
  // Animation Values
  const startAnimation = useRef(new Animated.Value(0)).current;

  // Scaling Down both logo and title
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  // Offset Animation
  const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  // Content Transition
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  useEffect(() => {
    // Start animation after 500ms
    setTimeout(() => {
      // Parallel Animation
      Animated.parallel([
        Animated.timing(startAnimation, {
          // for same height for non safe Area Devices
          toValue: -Dimensions.get('window').height + 65,
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          // Scaling to 0.35
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          // Scaling to 0.8
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          // Moving Logo Right
          toValue: {
            x: Dimensions.get('window').width / 2 - 35,
            y: Dimensions.get('window').height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          // Moving Logo Right
          toValue: {
            x: 0,
            y: Dimensions.get('window').height / 2 - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, [
    contentTransition,
    moveLogo,
    moveTitle,
    scaleLogo,
    scaleTitle,
    startAnimation,
  ]);

  // Going to Move Up like Nav Bar
  return (
    <SafeAreaProvider>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.animatedContent,
            {transform: [{translateY: startAnimation}]},
          ]}>
          <Animated.View style={styles.centerContent}>
            <TouchableOpacity onPress={() => console.log('Hello')}>
              <Animated.Image
                source={githubLogo}
                style={[
                  styles.logoImage,
                  {
                    transform: [
                      {translateX: moveLogo.x},
                      {translateY: moveLogo.y},
                      {scale: scaleLogo},
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            <Animated.Text
              style={[
                styles.headerText,
                {
                  transform: [
                    {translateX: moveTitle.x},
                    {translateY: moveTitle.y},
                    {scale: scaleTitle},
                  ],
                },
              ]}>
              React Native
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.mainContent,
          {
            transform: [{translateY: contentTransition}],
          },
        ]}>
        <Home navigation={navigation} />
      </Animated.View>

      <StatusBar backgroundColor={BGColor} barStyle="dark-content" />
    </SafeAreaProvider>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  animatedContent: {
    flex: 1,
    zIndex: 1,
    backgroundColor: BGColor,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  mainContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: COLORS.white,
  },
});
