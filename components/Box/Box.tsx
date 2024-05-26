import {Theme, createBox} from '../../theme';
import React from 'react';

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;
