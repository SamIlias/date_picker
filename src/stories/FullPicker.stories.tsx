import { Meta, StoryObj } from '@storybook/react-webpack5';

import { FullDatePicker } from '@/stories/FullDatePicker';
import { ThemeColor } from '@/theme/theme';

const meta: Meta<typeof FullDatePicker> = {
  title: 'Components/FullDatePicker',
  component: FullDatePicker,
};
export default meta;

type Story = StoryObj<typeof FullDatePicker>;

export const FullPicker: Story = {
  args: {
    theme: ThemeColor.LIGHT,
    showHolidaysCustom: false,
    showWeekendsCustom: false,
  },
};
