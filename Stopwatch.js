import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import {  } from '@react-native-community/slider';
import { Button, Icon, Slider } from 'react-native-elements';

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timer)}</Text>
       {!isRunning ? (
        <Button
          title="Start"
          onPress={startTimer}
          icon={<Icon name="play-circle" type="font-awesome" color="white" />}
        />
      ) : (
        <Button
          title="Pause"
          onPress={pauseTimer}
          icon={<Icon name="pause-circle" type="font-awesome" color="white" />}
        />
      )}
      <Button
        title="Reset"
        onPress={resetTimer}
        icon={<Icon name="stop-circle" type="font-awesome" color="white" />}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3600}
        step={1}
        value={timer}
        onValueChange={(value) => setTimer(value)}
        minimumTrackTintColor="#1E90FF"
        maximumTrackTintColor="#b3b3b3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slider: {
    width: '80%',
    marginVertical: 20,
  },
});

export default Stopwatch;
