/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';

import React, {Suspense} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
        <Suspense fallback={<Text>로딩중</Text>}>
          <Test></Test>
        </Suspense>
      </View>
    </SafeAreaView>
  );
}

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
