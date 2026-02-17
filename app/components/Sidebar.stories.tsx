import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Closed: Story = {
  name: '閉じている',
};

export const Opened: Story = {
  name: '開いている',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
  },
};
