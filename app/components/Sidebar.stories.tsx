import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from 'storybook/test';
import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Closed: Story = {
  name: 'Closed',
};

export const Opened: Story = {
  name: 'Opened',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
  },
};