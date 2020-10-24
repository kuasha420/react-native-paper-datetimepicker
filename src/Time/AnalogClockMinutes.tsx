import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { circleSize } from './AnalogClock';

function AnalogClockMinutes({
  minutes,
}: // onChange,
{
  minutes: number;
  // onChange: (hour: number) => any
}) {
  const range = getMinuteNumbers(circleSize, 12);

  return (
    <>
      {range.map((a, i) => {
        const currentMinutes = i * 5;
        const isZero = currentMinutes === 0;
        let textColorWhite =
          currentMinutes - 1 <= minutes && currentMinutes + 1 >= minutes;
        if (isZero) {
          textColorWhite = minutes >= 59 || currentMinutes + 1 >= minutes;
        }
        return (
          <View
            key={i}
            pointerEvents="none"
            style={[
              styles.outerHourRoot,
              {
                top: a[1] || 0,
                left: a[0] || 0,
              },
            ]}
          >
            <View style={styles.outerHourInner}>
              <Text
                style={textColorWhite ? styles.textWhite : null}
                selectable={false}
              >
                {isZero ? '00' : currentMinutes}
              </Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  outerHourRoot: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    width: 50,
    height: 50,
    marginLeft: -25,
    marginTop: -25,

    borderRadius: 25,
  },
  outerHourInner: { borderRadius: 25 },

  textWhite: { color: '#fff' },
});

function getMinuteNumbers(size: number, count: number) {
  let angle = 0;
  let step = (2 * Math.PI) / count;
  let radius = size / 2.5;

  angle = angle = (-90 * Math.PI) / 180;

  return Array(12)
    .fill(true)
    .map(() => {
      let x = Math.round(size / 2 + radius * Math.cos(angle));
      let y = Math.round(size / 2 + radius * Math.sin(angle));
      angle += step;
      return [x, y];
    });
}

export default React.memo(AnalogClockMinutes);
