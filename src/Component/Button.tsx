import React, {forwardRef, RefObject} from 'react';
import {cn} from '~/util/style.ts';
import {Pressable, Text, PressableProps} from 'react-native';
import {cva} from 'class-variance-authority';

const buttonStyleConfig = {
  variants: {
    bg: {
      primary: 'bg-red-200',
      secondary: 'bg-blue-500',
    },
    size: {
      l: 'w-[200px] h-[100px]',
      m: 'w-[100px] h-[50px]',
    },
  },
};

type PressablePropsWithoutRef = React.PropsWithoutRef<PressableProps>;

const buttonVariance = cva(
  'rounded-[10px] justify-center items-center',
  buttonStyleConfig,
);

type ButtonProps = {
  bg: keyof typeof buttonStyleConfig.variants.bg;
  size: keyof typeof buttonStyleConfig.variants.size;
} & PressablePropsWithoutRef;

type ButtonRef = React.ElementRef<typeof Pressable>;

const CustomButton = forwardRef<ButtonRef, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {bg, size} = props;

    return (
      <Pressable ref={ref} className={cn(buttonVariance({bg, size}))}>
        <Text>안뇽</Text>
      </Pressable>
    );
  },
);

export default CustomButton;
