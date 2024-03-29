# Add2Calendar

![release](https://github.com/jojoee/add2calendar/workflows/release/badge.svg)
![continuous integration](https://github.com/jojoee/add2calendar/workflows/continuous%20integration/badge.svg?branch=master)
[![Codecov](https://img.shields.io/codecov/c/github/jojoee/add2calendar.svg)](https://codecov.io/github/jojoee/add2calendar)
[![Bower Version](https://img.shields.io/bower/v/add2calendar.svg)](https://bower.io/search/?q=add2calendar)
[![Npm Version](https://img.shields.io/npm/v/add2calendar.svg)](https://www.npmjs.com/package/add2calendar)
[![License - npm](https://img.shields.io/npm/l/add2calendar.svg)](http://opensource.org/licenses/MIT)
[![Release Version](https://img.shields.io/github/release/jojoee/add2calendar.svg)](https://github.com/jojoee/add2calendar/releases)
[![Downloads](https://img.shields.io/npm/dt/add2calendar.svg)](https://github.com/jojoee/add2calendar/archive/master.zip)

Allow you to add event to `calendar` easier

[![Screenshot 1](https://raw.githubusercontent.com/jojoee/add2calendar/master/screenshot/screenshot1.gif "Screenshot 1")](http://jojoee.github.io/add2calendar/)

## Feature
| | Single Event | Multi Event |
| --- | --- | --- |
| Google | ✅ | |
| Yahoo | ✅ | |
| iCal | ✅ | ✅ |
| Outlook | ✅ | ✅ |

## Compatible with all browsers:
- Google Chrome 19+
- Mozilla Firefox 3.5+
- Safari 6+
- Internet Explorer 10+
- Opera 11.5

## Getting Started

```
Install

1. Install via `npm`
1.1 Install npm
1.2 Install package: `npm install --save add2calendar`

2. Install via `bower`
2.1 Install npm
2.2 Install bower: `npm install -g bower`
2.3 Install package: `bower install --save add2calendar`
```

```javascript
// Import via CommonJS
const Add2Calendar = require('add2calendar')
// Import via ES6
import * as Add2Calendar from "add2calendar"
```

```html
<!-- Import via githack -->
<link rel="stylesheet" href="https://rawcdn.githack.com/jojoee/add2calendar/v1.1.2/css/add2calendar.css">
<script src="https://rawcdn.githack.com/jojoee/add2calendar/v1.1.2/js/add2calendar.js"></script>
<!-- Import via bower -->
<link rel="stylesheet" href="./bower_components/add2calendar/css/add2calendar.css">
<script src="./bower_components/add2calendar/js/add2calendar.js"></script>
```

```javascript
// Example usage

var singleEventArgs = {
  title       : 'Add2Calendar plugin event',
  start       : 'July 27, 2016 10:30',
  end         : 'July 29, 2016 19:20',
  location    : 'Bangkok, Thailand',
  description : 'Event description',
  isAllDay    : false,
};
var singleEvent = new Add2Calendar(singleEventArgs);

// to get actual url
singleEvent.getGoogleUrl(); // https://www.google.com/calendar/render?action=TEMPLATE&text=...
singleEvent.getICalUrl(); // data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0A...
singleEvent.getOutlookUrl(); // data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0A...
singleEvent.getYahooUrl(); // https://calendar.yahoo.com/?v=60&view=d&type=20&title=...

// render a widget
singleEvent.createWidget('#single-normal');
```

```javascript
// Example usage (React.js)

import * as Add2Calendar from "add2calendar"
import React from 'react'
import 'add2calendar/css/add2calendar.css'

class Add2CalendarComponent extends React.Component {
  componentDidMount () {
    const singleEvent = new Add2Calendar({
      title: 'Add2Calendar plugin event',
      start: 'December 19, 2020 10:30',
      end: 'December 19, 2020 10:50',
      location: 'Bangkok, Thailand',
      description: 'Event description'
    })
    singleEvent.createWidget('#single-normal')
  }

  render() {
    return (
      <div id="single-normal"></div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Add2CalendarComponent />
    </div>
  );
}

export default App;
```

```javascript
// Example usage (multiple events)

var multiEventsArgs = [
  {
    title       : 'Add2Calendar plugin event 1',
    start       : 'July 27, 2016 10:30',
    end         : 'July 27, 2016 19:30',
    location    : 'Bangkok, Thailand',
    description : 'Event description 1',
  },
  {
    title       : 'Add2Calendar plugin event 2',
    start       : 'July 28, 2016 10:30',
    end         : 'July 29, 2016 19:20',
    location    : 'Bangkok, Thailand',
    description : 'Event description 2',
  }
];
var multiEvents = new Add2Calendar(multiEventsArgs);

// to get actual url
multiEvents.getICalUrl(); // data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2...
multiEvents.getOutlookUrl(); // data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2...

// render a widget
multiEvents.createWidget('#multi-normal');
```

```
Parameters

---- Example
title       : 'Add2Calendar plugin event',
start       : 'July 27, 2016 10:30',
end         : 'July 29, 2016 19:20',
location    : 'Bangkok, Thailand',
description : 'Event description.',
isAllDay    : false,

---- Default
title       : ''
location    : ''
description : ''
isAllDay    : false

---- Type
title       : <string>
location    : <string>
start       : <string> (date format) (required)
end         : <string> (date format) (required)
description : <string>
isAllDay    : <boolean>
```

## Why this plugin
Apologize me, if I miss something

1: Simple

2: Many plugins do not meet my requirements
```
2.1 [addevent.com](https://www.addevent.com/)
- Not free

2.2 [addtocalendar](http://addtocalendar.com/)
- Google: OK
- iCal: OK
- Outlook: OK
- Outlook Online: not working (tested at 25/07/2016)
- Yahoo!: incorrect end date (tested at 25/07/2016)
- They link to their own service
- They add their own "description" at the bottom of event's description

2.3 [add-to-calendar-buttons](https://github.com/carlsednaoui/add-to-calendar-buttons)
- Google: OK
- iCal: OK
- Outlook: OK
- Outlook Online: don't have
- Yahoo!: incorrect date (tested at 25/07/2016)

2.4 [jquery.addtocalendar](https://github.com/tardate/jquery.addtocalendar)
- Google: OK
- iCal: don't have
- Outlook: don't have
- Outlook Online: incorrect date, event and description not working (tested at 25/07/2016)
- Yahoo!: OK
```

## Important changelog
```
1.1.8
- Fix Yahoo, "isAllDay" is not working

1.1.7
- Test against multiple nodejs versions since 4 to 16

1.1.6
- Update accessibility by using <button> tag instead

1.1.5
- Support component-based framework e.g. React.js

1.1.4
- Support "isAllDay" param

1.1.3
- Fix iCal, data is truncated when it contains a "#" character

1.1.2
- Fix CommonJS importing error

1.1.1
- Update devDependencies versions
- Adding prefix to prevent naming collision
- Support CommonJS importing
- CI integration
- Support timezone
- Replace Sass with Less

1.1.0
- Remove `setLang` API (using `setOption` instead)
- Remove outlook-online from the list

1.0.0
- First release
```

## Future Update
- Support All Node.js versions since 4 to 16
- Zero dependency
- Support ES6 module importing
- [ ] Update Google format to [new format](https://developers.google.com/google-apps/calendar/gadgets/event/)
- [ ] `start` and `end` parameters can be `Date` objet
- [ ] Unit test: automated test on browser environment
- [ ] Create default value of `end` variable (should be equal `start` + 1 day)
- [x] Support callback function
- [x] Set language
- [x] Support `download` attr
- [x] Refactor `option` parameter
- [ ] Support Office 365
- [ ] Support https://outlook.live.com/
- [ ] Recurring events e.g. weekly, monthly

## Development and contribution

```bash
nvm install 4.0.0
nvm install 4.0.0 && nvm use 4.0.0
# or "nvm install 11.15.0 && nvm use 11.15.0"
npm install
npm shrinkwrap
mv ./npm-shrinkwrap.json ./package-lock.json

# publishing
npm publish --dry-run
npm publish
```

## Format and others
- [escape() vs encodeURI()](http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent)
- [.ics vs .vcs](http://stackoverflow.com/questions/1310420/difference-between-icalendar-ics-and-the-vcalendar-vcs)
- [Timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Google Format: [1](https://productforums.google.com/forum/#!topic/calendar/HwpEpEjp1Hc), [2](https://productforums.google.com/forum/#!topic/calendar/Ovj6BNTQNL0), [3](http://useroffline.blogspot.com/2009/06/making-google-calendar-link.html)
- iCal Format: [ICalendar](https://en.wikipedia.org/wiki/ICalendar), [1.0 format(vcs)](http://support.microsoft.com/kb/287625), [2.0 format(ics)](http://support.microsoft.com/kb/307313)
- [URL Encoding](http://www.w3schools.com/tags/ref_urlencode.asp)
- [Date.prototype.toISOString()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
- [Outlook: Linking to calendars](https://msdn.microsoft.com/en-us/library/hh846807.aspx)
- [Adding Events to Users Calendars – Part 2 – Web Calendars](https://richmarr.wordpress.com/2008/01/07/adding-events-to-users-calendars-part-2-web-calendars/)

## Helper tool
- [htmlviewer](http://codebeautify.org/htmlviewer/)
- [css-beautify-minify](http://codebeautify.org/css-beautify-minify)
- [jsbeautifier.org](http://jsbeautifier.org/)
- [countrycode.org](https://countrycode.org/)
