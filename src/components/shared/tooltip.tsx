import {
    Tooltip as MantineTooltip,
    TooltipProps,
  } from "@mantine/core";

const EVENTS_FOR_TOOLTIP = { hover: true, focus: true, touch: true } as const;

export const Tooltip = (props: TooltipProps) => {
    if (!props.label) {
      return props.children;
    }
  
    return <MantineTooltip color="gray" offset={4} events={EVENTS_FOR_TOOLTIP} {...props} />;
  };