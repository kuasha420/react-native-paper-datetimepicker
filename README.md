## react-native-paper-datetimepicker

- A datetimepicker for react-native-paper based in web-ridges' react-native-paper-dates

## Getting started

Yarn

```
yarn add react-native-paper-datetimepicker
```

npm

```
npm install react-native-paper-datetimepicker --save
```

### Web

If you use react-native-web and want to use this library you'll need to install react-window.

Yarn

```
yarn add react-window
```

npm

```
npm install react-window --save
```

## Usage

```tsx
import * as React from 'react';
import { Button } from 'react-native-paper';
import { DateTimePickerModal } from 'react-native-paper-datetimepicker';

function SingleDatePage() {
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    console.log({ date });
  }, []);

  const date = new Date();

  return (
    <>
      <DateTimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        date={date}
        onConfirm={onChange}
        label="Pick A Date"
      />
      <TextInput value={date.toLocaleString()} />
      <Button onPress={() => setVisible(true)}>Pick date</Button>
    </>
  );
}
```

## Android Caveats

You will need to add a polyfill for the Intl API on Android if:

- You have Hermes enabled (https://github.com/facebook/hermes/issues/23)
- You have Hermes disabled and you want to support locales outside of en-US and you don't have the org.webkit:android-jsc-intl:+ variant enabled in your app/build.gradle

Install polyfills with Yarn

```
yarn add react-native-localize @formatjs/intl-pluralrules @formatjs/intl-getcanonicallocales @formatjs/intl-listformat @formatjs/intl-displaynames @formatjs/intl-locale @formatjs/intl-datetimeformat @formatjs/intl-numberformat @formatjs/intl-relativetimeformat
```

or npm

```
npm install react-native-localize @formatjs/intl-pluralrules @formatjs/intl-getcanonicallocales @formatjs/intl-listformat @formatjs/intl-displaynames @formatjs/intl-locale @formatjs/intl-datetimeformat @formatjs/intl-numberformat @formatjs/intl-relativetimeformat --save
```

`./index.js`

```javascript
// on top of your index.js file
const isAndroid = require('react-native').Platform.OS === 'android';
const isHermesEnabled = !!global.HermesInternal;

// in your index.js file
if (isHermesEnabled || isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/nl.js'); // use your language files

  require('@formatjs/intl-datetimeformat/add-all-tz.js');

  require('@formatjs/intl-locale/polyfill');

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  let RNLocalize = require('react-native-localize');
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
  }
}
```

## Contributing

This package is a stop-gap solution until we have a datetimepicker on web-ridges' pacckage. Please contribute there.

## License

MIT

## Credit

Code heavily borrowed from react-native-paper-dates.

- https://github.com/web-ridge/react-native-paper-dates
