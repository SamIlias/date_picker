import { Meta, StoryObj } from '@storybook/react-webpack5';

import { TasksDatePicker } from '@/stories/TasksDatePicker';
import { ThemeColor } from '@/theme/theme';

const meta: Meta<typeof TasksDatePicker> = {
  title: 'Components/TasksDatePicker',
  component: TasksDatePicker,
};
export default meta;

type Story = StoryObj<typeof TasksDatePicker>;

export const TasksPicker: Story = {
  args: {
    theme: ThemeColor.LIGHT,
    showHolidaysCustom: false,
    showWeekendsCustom: false,
  },
};
