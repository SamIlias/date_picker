import { Meta, StoryObj } from '@storybook/react-webpack5';

import { ThemeColor } from '@';
import { BaseDatePicker } from '@/stories/BaseDatePicker';

const meta: Meta<typeof BaseDatePicker> = {
  title: 'Components/BaseDatePicker',
  component: BaseDatePicker,
};
export default meta;

type Story = StoryObj<typeof BaseDatePicker>;

export const BasePicker: Story = {
  args: {
    theme: ThemeColor.DARK,
    showWeekendsCustom: false,
    showHolidaysCustom: false,
  },
};
