import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { circleSize } from './AnalogClock';

function AnalogClockHours({
  is24Hour,
  hours,
}: // onChange,
{
  is24Hour: boolean;
  hours: number;
  // onChange: (hour: number) => any
}) {
  const outerRange = getHourNumbers(false, circleSize, 12);
  const innerRange = getHourNumbers(true, circleSize, 12);
  return (
    <>
      {outerRange.map((a, i) => (
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
              style={hours === i + 1 ? styles.textWhite : null}
              selectable={false}
            >
              {i + 1}
            </Text>
          </View>
        </View>
      ))}
      {is24Hour
        ? innerRange.map((a, i) => (
            <View
              key={i}
              pointerEvents="none"
              style={[
                styles.innerHourRoot,
                {
                  top: a[1] || 0,
                  left: a[0] || 0,
                },
              ]}
            >
              <View style={styles.innerHourInner}>
                <Text
                  selectable={false}
                  style={[
                    styles.innerHourText,
                    i + 13 === hours ? styles.textWhite : null,
                  ]}
                >
                  {i + 13 === 24 ? '00' : i + 13}
                </Text>
              </View>
            </View>
          ))
        : null}
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
  innerHourRoot: {
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20,
  },
  innerHourInner: { borderRadius: 20 },
  innerHourText: { fontSize: 13 },
  textWhite: { color: '#fff' },
});

function getHourNumbers(is24Hour: boolean, size: number, count: number) {
  let angle = 0;
  let step = (2 * Math.PI) / count;
  let radius = size / (is24Hour ? 4 : 2.5);

  angle = (-90 * Math.PI) / 180 + Math.PI / 6;

  return Array(12)
    .fill(true)
    .map(() => {
      let x = Math.round(size / 2 + radius * Math.cos(angle));
      let y = Math.round(size / 2 + radius * Math.sin(angle));
      angle += step;
      return [x, y];
    });
}

export default React.memo(AnalogClockHours);
