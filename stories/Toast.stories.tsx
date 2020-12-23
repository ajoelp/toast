import { Meta, Story } from '@storybook/react';
import React from 'react';
import { toast, ToastWrapper, ToastWrapperProps } from '../src';

const meta: Meta = {
  title: 'Toast',
  component: ToastWrapper,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ToastWrapperProps> = (props) => {
  const triggerToast = () => {
    toast('This is sample message');
  };

  return (
    <div>
      <button onClick={triggerToast}>Trigger Toast</button>
      <ToastWrapper {...props} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
