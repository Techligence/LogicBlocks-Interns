// eventActions.js
import { createAction } from '@reduxjs/toolkit';

export const triggerEvent = createAction('event/triggerEvent');
export const whenKeyPressed = createAction('event/whenKeyPressed');
export const whenSpriteClicked = createAction('event/whenSpriteClicked');

