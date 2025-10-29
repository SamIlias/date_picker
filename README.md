# Sam DatePicker

Sam DatePicker is a modular and flexible React date picker library with support for date ranges, tasks, holidays, date limits, and the ability to inject a custom date and receive the selected date back via callback.

**Developed by Samovich Ilya.**

## Features

* Modular architecture with `Builder` and `CalendarConfig`
* Support for range selection and date restrictions
* Built-in holidays (e.g. Belarus)
* Configurable starting week day
* Built-in light and dark themes
* Works with React 18+
* Styled using styled-components (with internal ThemeProvider)
* Ready for custom integrations via callbacks

## Installation
```bash
# with npm
npm install @sam/datepicker

# or with yarn
yarn add @sam/datepicker
```

## Extended Example
```tsx
import {
  Builder,
  CalendarConfig,
  DatePicker,
  FeatureType,
  holidaysBelarus,
  Views,
  WeekStartsOn,
} from '@sam/datepicker';
import { ThemeColor } from '@sam/datepicker/theme';

const config: CalendarConfig = {
  view: Views.WEEKS,
  weekStartsOn: WeekStartsOn.MONDAY,
  initialDate: new Date(),
  minDate: new Date(2024, 3, 10),
  maxDate: new Date(2025, 11, 9),
  showWeekends: true,
  holidays: holidaysBelarus,
  features: [
    FeatureType.WITH_DATE_LIMITS,
    FeatureType.WITH_RANGE,
    FeatureType.WITH_TASKS,
  ],
};

const builder = new Builder(config);
const calendar = builder.createCalendar();

export const Example = () => {
  const customDate = new Date(2025, 10, 3);
  const customCallback = (date: Date) => {
    console.log('Here the date for your app: ', date);
  };

  return (
    <DatePicker
        calendar={calendar}
        customDate={customDate}
        customCallback={customCallback}
        theme={ThemeColor.DARK}
    />
  );
};
```

## ⚙️ Configuration

The main configuration interface is `CalendarConfig`.
```typescript
type CalendarConfig = {
  view: Views;
  weekStartsOn: WeekStartsOn;
  initialDate: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  showWeekends?: boolean;
  holidays?: Date[];
  features?: FeatureType[];
};
```

## Builder

The `Builder` pattern allows you to create customized calendar instances:
```typescript
const builder = new Builder(config);
const calendar = builder.createCalendar();
```

You can then pass the `calendar` instance directly to the `<DatePicker />` component.

## Theming

Sam DatePicker includes two built-in themes:

| Theme | Description |
|-------|-------------|
| `ThemeColor.LIGHT` | Light mode |
| `ThemeColor.DARK` | Dark mode |

The internal `ThemeProvider` is already integrated — no extra setup is needed.

**Example:**
```tsx
<DatePicker theme={ThemeColor.DARK} />
```

## Main Exports

| Export | Description |
|--------|-------------|
| `Builder` | Creates a calendar instance |
| `DatePicker` | Main UI component |
| `ThemeColor` | Theme enum (LIGHT / DARK) |
| `FeatureType` | Feature flags for calendar |
| `holidays` | Predefined holiday list |
| `Views`, `WeekStartsOn` | Calendar view and week start enums |
| `CalendarConfig` | Configuration type |

## Live Demo

[View Demo](https://samdatepicker.netlify.app/?path=/story/components-fulldatepicker--full-picker)

## Tech Stack

* React
* TypeScript
* styled-components
* Rollup for bundling
* Storybook for UI documentation
* Jest / React Testing Library for testing

## License

© 2025 — Developed by **Samovich Ilya**

[GitHub Repository](https://github.com/SamIlias/date_picker/tree/main)