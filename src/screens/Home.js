import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../assets/color';

const Home = ({navigation}) => {
  // Data in Card
  const cardData = [
    {title: 'Title 1', path: 'BottomTab1'},
    {title: 'Title 2', path: 'MultiColor'},
    {title: 'Title 3'},
    {title: 'Title 4'},
    {title: 'Title 5'},
  ];
  // Dynamic Backgroundcolor of Card
  const cardBgColor = [
    COLORS.tints.green100,
    COLORS.tints.yellow100,
    COLORS.tints.purple100,
    COLORS.tints.red100,
  ];
  return (
    <View>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {cardData.map((data, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  navigation.navigate(data?.path);
                }}
                activeOpacity={0.9}
                style={[
                  styles.cardContainer,
                  {
                    backgroundColor: cardBgColor[key % 4],
                  },
                ]}>
                <Text>{data?.title}!</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: 200,
    borderRadius: 40,
    marginBottom: 25,
    elevation: 5,
  },
});
