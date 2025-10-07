import { Meta, StoryObj } from '@storybook/react-webpack5';

import { DatePicker } from '../components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'DatePicker',
  },
};
