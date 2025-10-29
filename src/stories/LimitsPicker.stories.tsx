import { Meta, StoryObj } from '@storybook/react-webpack5';

import { LimitsDatePicker } from '@/stories/LimitsDatePicker';
import { ThemeColor } from '@/theme/theme';

const meta: Meta<typeof LimitsDatePicker> = {
  title: 'Components/LimitsDatePicker',
  component: LimitsDatePicker,
};
export default meta;

type Story = StoryObj<typeof LimitsDatePicker>;

export const LimitsPicker: Story = {
  args: {
    theme: ThemeColor.LIGHT,
    showHolidaysCustom: false,
    showWeekendsCustom: false,
  },
};
