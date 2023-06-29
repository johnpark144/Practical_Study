import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = () => {
  const { container, title } = styles;
  const [count, setCount] = useState(0);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    console.log(`count value : ${count} `);
    return () => {
      console.log('useeffect cleanup');
    };
  }, [count]);

  return (
    <View style={container}>
      <Text style={title}>{`Count: ${count}`}</Text>
      <Button
        color={'red'}
        title={'Increase the count'}
        onPress={() => setCount(count + 1)} // onClick이 아님
      />
      <Button
        color={'green'}
        title={'Decrease the count'}
        onPress={() => setCount(count - 1)}
      />
      <Button
        color={'red'}
        title={'Increase the count'}
        onPress={() => setNewCount(newCount + 1)}
      />
      <Button
        color={'green'}
        title={'Decrease the count'}
        onPress={() => setNewCount(newCount - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: 25,
  },
});
export default Counter;
