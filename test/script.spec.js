/* global require, global */

var chai = require('chai'),
  expect = chai.expect;

var Add2Calendar = require('../js/add2calendar.js');
/** @type Add2Calendar */
var event = null; //
var eventArgs = null;

// manipulate "document" object for testing
global.document = {
  URL: 'http://127.0.0.1:5500/' // http://127.0.0.1:5500
};

describe('Test', function() {
  it('Mocha and Chai should work', function() {
    expect(true).to.be.true;
    expect(false).to.be.false;
  });
});

describe('Add2Calendar: core', function() {
  before(function() {
    eventArgs = {
      title       : 'Add2Calendar plugin event',
      start       : 'July 27, 2016 10:30',
      end         : 'July 29, 2016 19:20',
      location    : 'Bangkok, Thailand',
      description : 'Event description'
    };
    event = new Add2Calendar(eventArgs);
  });


  it('mergeObj', function() {
    // normal case
    expect(event.mergeObj({lang: "en", buttonText: "Add to calendar"}, {lang: "cn"})).to.deep.equals({lang: "cn", buttonText: "Add to calendar"});
    expect(event.mergeObj({lang: "en", buttonText: ""}, {buttonText: "Custom button text"})).to.deep.equals({lang: "en", buttonText: "Custom button text"});
    expect(event.mergeObj({lang: "en", buttonText: ""}, {lang: "cn"})).to.deep.equals({lang: "cn", buttonText: ""});
    expect(event.mergeObj({lang: "en", buttonText: ""}, {buttonText: "Custom button text"})).to.deep.equals({lang: "en", buttonText: "Custom button text"})
  });

  it('pad', function() {
    // normal case
    expect(event.pad(2, 1)).to.equals("2")
    expect(event.pad(8, 2)).to.equals("08")
    expect(event.pad(3, 3)).to.equals("003")
    expect(event.pad(12, 4)).to.equals("0012")
  });

  it('formatTime', function() {
    expect(event.formatTime(new Date('Fri Feb 28 2020 13:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200228T060354Z')
    expect(event.formatTime(new Date('Sat Feb 29 2020 13:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200229T060354Z')
    expect(event.formatTime(new Date('Sat Feb 29 2020 20:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200229T130354Z')
    expect(event.formatTime(new Date('Wed Jul 27 2016 10:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160727T033000Z')
    expect(event.formatTime(new Date('Wed Jul 27 2016 19:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160727T123000Z')
    expect(event.formatTime(new Date('Thu Jul 28 2016 10:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160728T033000Z')
    expect(event.formatTime(new Date('Fri Jul 29 2016 19:20:00 GMT+0700 (Indochina Time)'))).to.equals('20160729T122000Z')
  });

  it('formatTime2', function() {
    expect(event.formatTime2(new Date('Fri Feb 28 2020 13:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200228')
    expect(event.formatTime2(new Date('Sat Feb 29 2020 13:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200229')
    expect(event.formatTime2(new Date('Sat Feb 29 2020 20:03:54 GMT+0700 (Indochina Time)'))).to.equals('20200229')
    expect(event.formatTime2(new Date('Wed Jul 27 2016 10:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160727')
    expect(event.formatTime2(new Date('Wed Jul 27 2016 19:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160727')
    expect(event.formatTime2(new Date('Thu Jul 28 2016 10:30:00 GMT+0700 (Indochina Time)'))).to.equals('20160728')
    expect(event.formatTime2(new Date('Fri Jul 29 2016 19:20:00 GMT+0700 (Indochina Time)'))).to.equals('20160729')
  });

  it('isObjectType', function() {
    expect(event.isObjectType({}, 'Array')).to.be.false
    expect(event.isObjectType(function () {}, 'Function')).to.be.true
    expect(event.isObjectType(undefined, 'Function')).to.be.false
    expect(event.isObjectType([{}, {}], 'Array')).to.be.true
  });

  it('serialize', function() {
    expect(event.serialize({
      text: "Add2Calendar plugin event",
      dates: "20200228T060354Z/20200229T060354Z",
      location: "Bangkok, Thailand",
      details: "Welcome everyone to simple plugin that allow you to add event to calendar easily.",
      sprop: ""
    })).to.be.equals('text=Add2Calendar%20plugin%20event&dates=20200228T060354Z%2F20200229T060354Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&sprop=')
    expect(event.serialize({
      view: "d",
      type: "20",
      title: "Add2Calendar plugin event",
      st: "20200228T060354Z",
      et: "20200229T130354Z",
      in_loc: "Bangkok, Thailand",
      desc: "Welcome everyone to simple plugin that allow you to add event to calendar easily.",
    })).to.be.equals('view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T060354Z&et=20200229T130354Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.')
  });

  /*
  ignore
  - isValidEventData
  - isDateObject
  - isFunc
  - isArray
  - replaceSpecialCharacterAndSpaceWithHyphen
  */
});

describe('Add2Calendar: widget', function() {
  before(function() {
    eventArgs = {
      title       : 'Add2Calendar plugin event',
      start       : 'July 27, 2016 10:30',
      end         : 'July 29, 2016 19:20',
      location    : 'Bangkok, Thailand',
      description : 'Event description'
    };
    event = new Add2Calendar(eventArgs);
  });

  it('getLinkHtml', function() {
    // Google
    expect(event.getLinkHtml(
      'Google',
      'https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228T060354Z%2F20200229T060354Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&sprop=',
      'icon-google',
      false
    )).to.equals('<a  class="icon-google" target="_blank" href="https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228T060354Z%2F20200229T060354Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&sprop=">Google</a>');
    
    // Yahoo
    expect(event.getLinkHtml(
      'Yahoo!',
      'https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T060354Z&et=20200229T130354Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.',
      'icon-yahoo',
      false
    )).to.equals('<a  class="icon-yahoo" target="_blank" href="https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T060354Z&et=20200229T130354Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.">Yahoo!</a>');

    // Outlook
    expect(event.getLinkHtml(
      'Outlook',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20200228T060354Z%0ADTEND:20200229T060354Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'icon-outlook',
      true,
      '123'
    )).to.equals('<a  download="add2Calendar-outlook-123"  class="icon-outlook" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20200228T060354Z%0ADTEND:20200229T060354Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">Outlook</a>');
    expect(event.getLinkHtml(
      'Outlook',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'icon-outlook',
      true,
      '456'
    )).to.equals('<a  download="add2Calendar-outlook-456"  class="icon-outlook" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">Outlook</a>');

    // iCal
    expect(event.getLinkHtml(
      'iCal',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20200228T060354Z%0ADTEND:20200229T060354Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'icon-ical',
      true,
      '789'
    )).to.equals('<a  download="add2Calendar-ical-789"  class="icon-ical" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20200228T060354Z%0ADTEND:20200229T060354Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">iCal</a>');
    expect(event.getLinkHtml(
      'iCal',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'icon-ical',
      true,
      '0'
    )).to.equals('<a  download="add2Calendar-ical-0"  class="icon-ical" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">iCal</a>');
  });

  /*
  ignore
  - getCurrentUtcTimestamp
  - getGoogleUrl
  - getGoogleLiHtml
  - openGoogle
  - getICalUrl
  - getICalLiHtml
  - openICal
  - getOutlookUrl
  - getOutlookLiHtml
  - openOutlook
  - getOutlookOnlineUrl
  - getOutlookOnlineLiHtml
  - openOutlookOnline
  - getYahooUrl
  - getYahooLiHtml
  - openYahoo
  - getEventListItemsHtml
  - getEventNotFoundListHtml
  - getEventNotFoundListItemsHtml
  - getWidgetNode
  - getWidgetBtnText
  - createWidget
  - bindClickEvent
  - hasClass
  - setOption
  - resetOption
  - update
  - updateWidget
  - updateAllCalendars
  - init
  */

});

describe('Add2Calendar: single event', function() {
  before(function() {
    eventArgs = {
      title: 'Add2Calendar plugin event',
      start: new Date('Fri Feb 28 2020 15:00:42 GMT+0700 (Indochina Time)'),
      end: new Date('Sat Feb 29 2020 15:00:42 GMT+0700 (Indochina Time)'),
      location: 'Bangkok, Thailand',
      description: 'Welcome everyone to simple plugin that allow you to add event to calendar easily.'
    };
    event = new Add2Calendar(eventArgs);
  });

  it('e2e', function() {
    expect(event.updateGoogleUrl()).to.equals('https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228T080042Z%2F20200229T080042Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&ctz=&locale=&sprop=');
    expect(event.updateICalUrl()).to.equals('data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T080042Z%0ADTEND:20200229T080042Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR');
    expect(event.updateYahooUrl()).to.equals('https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T080042Z&et=20200229T150042Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.');

    // getLiHtml
    expect(event.getLiHtml(
      'Google',
      'https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228T074340Z%2F20200229T074340Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&sprop=',
      'google',
      undefined
    )).to.equals('<li class="a2cldr-item a2cldr-google"><a  class="icon-google" target="_blank" href="https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228T074340Z%2F20200229T074340Z&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&sprop=">Google</a></li>');
    expect(event.getLiHtml(
      'iCal',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T074340Z%0ADTEND:20200229T074340Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'ical',
      true,
      1582271020761 // todo fix the hardcode for testing purpose
    )).to.equals('<li class="a2cldr-item a2cldr-ical"><a  download="add2Calendar-ical-1582271020761"  class="icon-ical" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T074340Z%0ADTEND:20200229T074340Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">iCal</a></li>');
    expect(event.getLiHtml(
      'Outlook',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T074340Z%0ADTEND:20200229T074340Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'outlook',
      true,
      1582271020763 // todo fix the hardcode for testing purpose
    )).to.equals('<li class="a2cldr-item a2cldr-outlook"><a  download="add2Calendar-outlook-1582271020763"  class="icon-outlook" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T074340Z%0ADTEND:20200229T074340Z%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">Outlook</a></li>');
    expect(event.getLiHtml(
      'Outlook Online',
      '',
      'outlook-online',
      undefined
    )).to.equals('');
    expect(event.getLiHtml(
      'Yahoo!',
      'https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T074340Z&et=20200229T144340Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.',
      'yahoo',
      undefined
    )).to.equals('<li class="a2cldr-item a2cldr-yahoo"><a  class="icon-yahoo" target="_blank" href="https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228T074340Z&et=20200229T144340Z&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.">Yahoo!</a></li>');

    // getEventListHtml
    // todo
  });
});

describe('Add2Calendar: single event with isAllDay = true', function() {
  before(function() {
    eventArgs = {
      title: 'Add2Calendar plugin event',
      start: new Date('Fri Feb 28 2020 15:00:42 GMT+0700 (Indochina Time)'),
      end: new Date('Sat Feb 29 2020 15:00:42 GMT+0700 (Indochina Time)'),
      location: 'Bangkok, Thailand',
      description: 'Welcome everyone to simple plugin that allow you to add event to calendar easily.',
      isAllDay: true
    };
    event = new Add2Calendar(eventArgs);
  });

  it('e2e', function() {
    // only difference is generated url
    expect(event.updateGoogleUrl()).to.equals('https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event&dates=20200228%2F20200229&location=Bangkok%2C%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&ctz=&locale=&sprop=');
    expect(event.updateICalUrl()).to.equals('data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228%0ADTEND:20200229%0ASUMMARY:Add2Calendar%20plugin%20event%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR');
    expect(event.updateYahooUrl()).to.equals('https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event&st=20200228&et=20200229&in_loc=Bangkok%2C%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20allow%20you%20to%20add%20event%20to%20calendar%20easily.');
  });
});

describe('Add2Calendar: single event, contains special characters', function() {
  before(function() {
    eventArgs = {
      title: 'Add2Calendar plugin event ;,/?:@&=+$# contains special characters',
      start: new Date('Fri Feb 28 2020 15:00:42 GMT+0700 (Indochina Time)'),
      end: new Date('Sat Feb 29 2020 15:00:42 GMT+0700 (Indochina Time)'),
      location: 'Bangkok, ;,/?:@&=+$# Thailand',
      description: 'Welcome everyone to simple plugin that ;,/?:@&=+$# allow you to add event to calendar easily.'
    };
    event = new Add2Calendar(eventArgs);
  });

  it('e2e', function() {
    expect(event.updateGoogleUrl()).to.equals('https://www.google.com/calendar/render?action=TEMPLATE&text=Add2Calendar%20plugin%20event%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20contains%20special%20characters&dates=20200228T080042Z%2F20200229T080042Z&location=Bangkok%2C%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20Thailand&details=Welcome%20everyone%20to%20simple%20plugin%20that%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20allow%20you%20to%20add%20event%20to%20calendar%20easily.&ctz=&locale=&sprop=');
    expect(event.updateICalUrl()).to.equals('data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20200228T080042Z%0ADTEND:20200229T080042Z%0ASUMMARY:Add2Calendar%20plugin%20event%20;,/?:@&=+$%23%20contains%20special%20characters%0ADESCRIPTION:Welcome%20everyone%20to%20simple%20plugin%20that%20;,/?:@&=+$%23%20allow%20you%20to%20add%20event%20to%20calendar%20easily.%0ALOCATION:Bangkok,%20;,/?:@&=+$%23%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR');
    expect(event.updateYahooUrl()).to.equals('https://calendar.yahoo.com/?v=60&view=d&type=20&title=Add2Calendar%20plugin%20event%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20contains%20special%20characters&st=20200228T080042Z&et=20200229T150042Z&in_loc=Bangkok%2C%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20Thailand&desc=Welcome%20everyone%20to%20simple%20plugin%20that%20%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20allow%20you%20to%20add%20event%20to%20calendar%20easily.');
  });
});

describe('Add2Calendar: multiple events', function() {
  before(function() {
    eventArgs = [
      {
        title: 'Add2Calendar plugin event 1',
        start: 'July 27, 2016 10:30',
        end: 'July 27, 2016 19:30',
        location: 'Bangkok, Thailand',
        description: 'Event description 1'
      },
      {
        title: 'Add2Calendar plugin event 2',
        start: 'July 28, 2016 10:30',
        end: 'July 29, 2016 19:20',
        location: 'Bangkok, Thailand',
        description: 'Event description 2'
      }
    ];
    event = new Add2Calendar(eventArgs);
  });

  it('e2e', function() {
    expect(event.updateGoogleUrl()).to.equals('')
    expect(event.updateICalUrl()).to.equals('data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR')
    expect(event.updateYahooUrl()).to.equals('')

    // getLiHtml
    expect(event.getLiHtml(
      'Google',
      '',
      'google',
      undefined
    )).to.equals('')
    expect(event.getLiHtml(
      'iCal',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'ical',
      true,
      1582271406220 // todo fix the hardcode for testing purpose
    )).to.equals('<li class="a2cldr-item a2cldr-ical"><a  download="add2Calendar-ical-1582271406220"  class="icon-ical" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">iCal</a></li>');
    expect(event.getLiHtml(
      'Outlook',
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR',
      'outlook',
      true,
      1582271406221 // todo fix the hardcode for testing purpose
    )).to.equals('<li class="a2cldr-item a2cldr-outlook"><a  download="add2Calendar-outlook-1582271406221"  class="icon-outlook" target="_blank" href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160727T033000Z%0ADTEND:20160727T123000Z%0ASUMMARY:Add2Calendar%20plugin%20event%201%0ADESCRIPTION:Event%20description%201%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0ABEGIN:VEVENT%0AURL:http://127.0.0.1:5500/%0ADTSTART:20160728T033000Z%0ADTEND:20160729T122000Z%0ASUMMARY:Add2Calendar%20plugin%20event%202%0ADESCRIPTION:Event%20description%202%0ALOCATION:Bangkok,%20Thailand%0AEND:VEVENT%0AEND:VCALENDAR">Outlook</a></li>');
    expect(event.getLiHtml(
      'Outlook Online',
      '',
      'outlook-online',
      undefined 
    )).to.equals('')
    expect(event.getLiHtml(
      'Yahoo!',
      '',
      'yahoo',
      undefined
    )).to.equals('')

    // getEventListHtml
    // todo
  });
});

// todo
describe('Add2Calendar: multiple events', function() {

});
