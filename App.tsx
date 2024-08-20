/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';

import React, {Suspense, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const {width} = Dimensions.get('window');

const fakeFetch = async (num: number) => {
  return num;
};

const numAtom = atom(1);
const dataAtom = atom(async get => await fakeFetch(get(numAtom)));

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <View>
        <Text>테스트</Text>
        <Carousel></Carousel>
        <Suspense fallback={<Text>로딩중</Text>}>
          <Test></Test>
        </Suspense>
      </View>
    </SafeAreaView>
  );
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const data = [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}];

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    console.log('offset', offsetX);
    const index = Math.round(offsetX / width);
    console.log(index);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({index: prevIndex});
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      <View style={{position: 'relative'}}>
        <FlatList
          ref={flatListRef}
          data={[{key: '1'}, {key: '2'}, {key: '3'}]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'red',
                width,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Text style={{fontSize: 24}}>{item.key}</Text>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: '50%',

            transform: [{translateX: -40}, {translateY: -20}],

            gap: 10,
          }}>
          {[0, 1, 2].map((_, idx) => (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: idx === currentIndex ? 'blue' : 'grey',
                borderRadius: 50,
              }}></View>
          ))}
        </View>
      </View>
      <Button title="좌로 이동" onPress={handlePrev}></Button>
      <Button title="우로 이동" onPress={handleNext}></Button>
    </>
  );
};

const Test = () => {
  const [test, setTest] = useAtom(numAtom);
  const data = useAtomValue(dataAtom);
  return (
    <>
      <Button
        title="클릭"
        onPress={() => {
          setTest(prev => prev + 1);
        }}></Button>
      <Text>{data}</Text>
    </>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
