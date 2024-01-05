import React from 'react';
import { LayoutRectangle, Dimensions, ViewStyle } from 'react-native';

const window = Dimensions.get('window');

const POSITION_ABSOLUTE: ViewStyle = {
  position: 'absolute',
};

const HIDDEN_CONTENT: ViewStyle = {
  position: 'absolute',
  left: window.width,
};

type UseRelativePositionArgs = Omit<
  GetContentStyleArgs,
  'triggerPosition' | 'contentLayout'
> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
};

export function useRelativePosition({
  align,
  avoidCollisions,
  triggerPosition,
  contentLayout,
  alignOffset,
  insets,
  sideOffset,
  side,
}: UseRelativePositionArgs) {
  return React.useMemo(() => {
    if (!triggerPosition || !contentLayout) {
      return HIDDEN_CONTENT;
    }
    return getContentStyle({
      align,
      avoidCollisions,
      contentLayout,
      side,
      triggerPosition,
      alignOffset,
      insets,
      sideOffset,
    });
  }, [triggerPosition, contentLayout]);
}

export interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

export type Insets = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

interface GetPositionArgs {
  avoidCollisions: boolean;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  insets?: Insets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  side: 'top' | 'bottom';
  sideOffset: number;
}

function getSidePosition({
  side,
  triggerPosition,
  contentLayout,
  sideOffset,
  insets,
  avoidCollisions,
}: GetSidePositionArgs) {
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;
  const positionTop =
    triggerPosition?.pageY - sideOffset - contentLayout.height;
  const positionBottom =
    triggerPosition.pageY + triggerPosition.height + sideOffset;

  if (!avoidCollisions) {
    return {
      top: side === 'top' ? positionTop : positionBottom,
    };
  }

  if (side === 'top') {
    const isCollision =
      triggerPosition.pageY + sideOffset < insetTop + contentLayout.height;
    return {
      top: isCollision ? positionBottom : positionTop,
    };
  }

  const isCollision =
    triggerPosition.pageY + triggerPosition.height + sideOffset >
    window.height - insetBottom - contentLayout.height;
  return {
    top: isCollision ? positionTop : positionBottom,
  };
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: 'start' | 'center' | 'end';
  alignOffset: number;
}

function getAlignPosition({
  align,
  avoidCollisions,
  contentLayout,
  triggerPosition,
  alignOffset,
  insets,
}: GetAlignPositionArgs) {
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;
  const maxContentWidth = window.width - insetLeft - insetRight;

  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  let left = getLeftPosition(
    align,
    triggerPosition.pageX,
    triggerPosition.width,
    contentWidth,
    alignOffset,
    insetLeft,
    insetRight
  );

  if (avoidCollisions) {
    const doesCollide =
      left < insetLeft || left + contentWidth > window.width - insetRight;
    if (doesCollide) {
      const spaceLeft = left - insetLeft;
      const spaceRight = window.width - insetRight - (left + contentWidth);

      if (spaceLeft > spaceRight && spaceLeft >= contentWidth) {
        left = insetLeft;
      } else if (spaceRight >= contentWidth) {
        left = window.width - insetRight - contentWidth;
      } else {
        const centeredPosition = Math.max(
          insetLeft,
          (window.width - contentWidth - insetRight) / 2
        );
        left = centeredPosition;
      }
    }
  }

  return { left, maxWidth: maxContentWidth };
}

function getLeftPosition(
  align: 'start' | 'center' | 'end',
  triggerPageX: number,
  triggerWidth: number,
  contentWidth: number,
  alignOffset: number,
  insetLeft: number,
  insetRight: number
) {
  let left = 0;
  if (align === 'start') {
    left = triggerPageX;
  }
  if (align === 'center') {
    left = triggerPageX + triggerWidth / 2 - contentWidth / 2;
  }
  if (align === 'end') {
    left = triggerPageX + triggerWidth - contentWidth;
  }
  return Math.max(
    insetLeft,
    Math.min(left + alignOffset, window.width - contentWidth - insetRight)
  );
}

type GetContentStyleArgs = GetPositionArgs &
  GetSidePositionArgs &
  GetAlignPositionArgs;

function getContentStyle({
  align,
  avoidCollisions,
  contentLayout,
  side,
  triggerPosition,
  alignOffset,
  insets,
  sideOffset,
}: GetContentStyleArgs) {
  return Object.assign(
    POSITION_ABSOLUTE,
    getSidePosition({
      side,
      triggerPosition,
      contentLayout,
      sideOffset,
      insets,
      avoidCollisions,
    }),
    getAlignPosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
    })
  );
}
