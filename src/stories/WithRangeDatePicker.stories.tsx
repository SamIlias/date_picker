import { Meta, StoryObj } from '@storybook/react-webpack5';

import { WithRangeDatePicker } from '@/stories/WithRangeDatePicker';
import { ThemeColor } from '@/theme/theme';

const meta: Meta<typeof WithRangeDatePicker> = {
  title: 'Components/WithRangeDatePicker',
  component: WithRangeDatePicker,
};
export default meta;

type Story = StoryObj<typeof WithRangeDatePicker>;

export const WithRange: Story = {
  args: {
    theme: ThemeColor.LIGHT,
    showHolidaysCustom: false,
    showWeekendsCustom: false,
  },
};
