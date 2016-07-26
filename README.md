# Add2Calendar
Allow you to add event to `calendar` easier

[![Add2Calendar - Screenshot](https://raw.githubusercontent.com/jojoee/add2calendar/gh-pages/screenshot/screenshot1.jpg "Add2Calendar - Screenshot")](http://jojoee.github.io/add2calendar/)

## Feature
- [x] Single Event: Google
- [x] Single Event: iCal
- [x] Single Event: Outlook
- [x] Single Event: Outlook Online
- [x] Single Event: Yahoo!
- [x] Multi Event: iCal
- [x] Multi Event: Outlook

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

```
Example usage

var singleEventArgs = {
  title       : 'Add2Calendar plugin event',
  start       : 'July 27, 2016 10:30',
  end         : 'July 29, 2016 19:20',
  location    : 'Bangkok, Thailand',
  description : 'Event description'
};
var singleEvent = new Add2Calendar(singleEventArgs);
singleEvent.createWidget('#single-event');
```

```
Parameters

---- Example
title       : 'Add2Calendar plugin event',
start       : 'July 27, 2016 10:30',
end         : 'July 29, 2016 19:20',
location    : 'Bangkok, Thailand',
description : 'Event description.'

---- Default
title       : ''
location    : ''
description : ''

---- Type
title       : <string>
location    : <string>
start       : <string> (date format) (required)
end         : <string> (date format) (required)
description : <string>
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

## Future Update
- [ ] Update Google format to [new format](https://developers.google.com/google-apps/calendar/gadgets/event/)
- [x] Submit to `bower`
- [x] Submit to `npm`
- [ ] Wordpress plugin
- [ ] `start` and `end` parameters can be `Date` objet
- [ ] Refactor
- [ ] Unit test
- [ ] Create default value of `end` variable (should be equal `start` + 1 day)
- [ ] Support ES6 (module export)
- [x] Support callback function
- [x] Set language

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
