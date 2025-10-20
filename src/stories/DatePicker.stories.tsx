import { Meta, StoryObj } from '@storybook/react-webpack5';

import { Example } from '@/ExamplePicker';

const meta: Meta<typeof Example> = {
  title: 'Components/DatePicker',
  component: Example,
};
export default meta;

type Story = StoryObj<typeof Example>;

export const Default: Story = {
  args: {
    label: 'DatePicker',
  },
};
