import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const ProgressCircle = ({
  progress,
  size,
  strokeWidth,
  circleColor,
  progressColor,
}) => {
  const [showProgress, setShowProgress] = useState(false);
  const [progressDegrees, setProgressDegrees] = useState(0);

  useEffect(() => {
    setShowProgress(true);
    setProgressDegrees(progress * 3.6);
  }, [progress]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: circleColor,
          },
        ]}
      />
      {showProgress && (
        <View
          style={[
            styles.progress,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: progressColor,
              transform: [{rotateZ: `${progressDegrees}deg`}],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default ProgressCircle;
