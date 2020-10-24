import * as React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Appbar, Button, Text, useTheme } from 'react-native-paper';
import TimePicker from '../Time/TimePicker';
import { clockTypes, PossibleClockTypes } from '../Time/timeUtils';
import Calendar from './Calendar';

export interface DateTimePickerModalProps {
  visible: boolean;
  onDismiss: () => void;
  onChange?: (date: Date) => void;
  onConfirm: (date: Date) => void;
  date: Date;
  label: string;
  theme?: ReactNativePaper.Theme;
}

export function DateTimePickerModal(props: DateTimePickerModalProps) {
  const theme = useTheme(props.theme);
  const dimensions = useWindowDimensions();
  const { visible, onDismiss, onChange, onConfirm, date, label } = props;

  // use local state to add only onConfirm state changes
  const [localDate, setLocalDate] = React.useState<Date>(date);
  const [isTime, setIsTime] = React.useState(false);

  const [hours, setHours] = React.useState<number>(localDate.getHours());
  const [minutes, setMinutes] = React.useState<number>(localDate.getMinutes());

  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  // update local state if changed from outside or if modal is opened
  React.useEffect(() => {
    setLocalDate(date);
  }, [date]);

  const onInnerChange = React.useCallback(
    (params) => {
      onChange && onChange(params.date);
      setLocalDate(params.date);
    },
    [onChange]
  );

  const onInnerConfirm = React.useCallback(() => {
    if (isTime) {
      setIsTime(false);
      onConfirm(localDate);
      return;
    }
    setLocalDate((currentDate) => {
      const newDate = new Date(currentDate.getTime());
      newDate.setHours(hours, minutes);
      newDate.setMinutes(minutes);
      return newDate;
    });
    setIsTime(true);
  }, [isTime, onConfirm, localDate, hours, minutes]);

  const onInnerDismiss = React.useCallback(() => {
    if (!isTime) {
      return onDismiss();
    }
    setIsTime(false);
  }, [onDismiss, isTime]);

  const onForcedDismiss = React.useCallback(() => {
    setIsTime(false);
    onDismiss();
  }, [onDismiss]);

  const [focused, setFocused] = React.useState<PossibleClockTypes>(
    clockTypes.hours
  );

  const onFocusInput = React.useCallback(
    (type: PossibleClockTypes) => setFocused(type),
    []
  );
  const onChangeTime = React.useCallback(
    (params: {
      focused?: PossibleClockTypes | undefined;
      hours: number;
      minutes: number;
    }) => {
      console.log(params);

      if (params.focused) {
        setFocused(params.focused);
      }

      setHours(params.hours);
      setMinutes(params.minutes);
      setLocalDate((currentDate) => {
        const newDate = new Date(currentDate.getTime());
        newDate.setHours(params.hours, params.minutes);
        newDate.setMinutes(params.minutes);
        return newDate;
      });
    },
    []
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onForcedDismiss}
      presentationStyle="overFullScreen"
      // @ts-ignore
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={onForcedDismiss}>
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.modalBackground,
            { backgroundColor: theme.colors.backdrop },
          ]}
        />
      </TouchableWithoutFeedback>
      <View
        style={[StyleSheet.absoluteFill, styles.modalRoot]}
        pointerEvents="box-none"
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.surface },
            dimensions.width > 600 ? styles.modalContentBig : null,
          ]}
        >
          <Appbar.Header theme={theme}>
            <Appbar.Action
              icon={isTime ? 'arrow-left' : 'close'}
              onPress={onInnerDismiss}
            />
            <Appbar.Content
              title={label}
              subtitle={localDate.toLocaleString()}
            />
            <Appbar.Action
              icon={!isTime ? 'clock' : 'calendar'}
              onPress={() => setIsTime((prev) => !prev)}
            />
          </Appbar.Header>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              {isTime ? 'Select Time' : 'Select Date'}
            </Text>
          </View>
          {isTime ? (
            <View style={[styles.timepicker, { height, width }]}>
              <TimePicker
                inputType="picker"
                focused={focused}
                hours={hours}
                minutes={minutes}
                onChange={onChangeTime}
                onFocusInput={onFocusInput}
              />
            </View>
          ) : (
            <View
              onLayout={(e) => {
                setHeight(e.nativeEvent.layout.height);
                setWidth(e.nativeEvent.layout.width);
              }}
              style={styles.datepicker}
            >
              <Calendar
                mode="single"
                date={localDate}
                onChange={onInnerChange}
                scrollMode="horizontal"
              />
            </View>
          )}
          <View style={styles.bottom}>
            <Button onPress={onInnerDismiss}>
              {isTime ? 'Pick Date' : 'Cancel'}
            </Button>
            <Button onPress={onInnerConfirm}>
              {isTime ? 'Confirm' : 'Pick Time'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    marginVertical: 50,
  },
  modalContentBig: {
    maxWidth: 600,
    maxHeight: 800,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
  },
  labelContainer: {
    height: 28,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'center',
    marginBottom: 75,
  },
  timepicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  datepicker: {
    flex: 1,
  },
});

export default React.memo(DateTimePickerModal);
