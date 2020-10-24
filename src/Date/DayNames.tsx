import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DayName from './DayName';
import { useTheme } from 'react-native-paper';

export const dayNamesHeight = 44;

// TODO: wait for a better Intl api ;-)
const weekdays = [
  new Date('2020-08-02'),
  new Date('2020-08-03'),
  new Date('2020-08-04'),
  new Date('2020-08-05'),
  new Date('2020-08-06'),
  new Date('2020-08-07'),
  new Date('2020-08-08'),
];

function DayNames() {
  const theme = useTheme();
  const shortDayNames = React.useMemo<string[]>(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'narrow',
    });
    return weekdays.map((date) => formatter.format(date));
  }, []);

  return (
    <View
      style={[styles.dayNames, { backgroundColor: theme.colors.surface }]}
      pointerEvents={'none'}
    >
      {shortDayNames.map((dayName, i) => (
        <DayName key={i} label={dayName} />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  dayNames: {
    height: dayNamesHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default React.memo(DayNames);
