import {Theme, createText} from '../../theme';
import React from 'react';

export const Text = createText<Theme>();
export type TextProps = React.ComponentProps<typeof Text>;
