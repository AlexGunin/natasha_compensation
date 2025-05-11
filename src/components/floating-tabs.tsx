import {
  CSSProperties,
  FloatingIndicator,
  Tabs,
  TabsStylesNames,
  Title,
} from "@mantine/core";
import { ReactElement, useState, MouseEvent, useEffect } from "react";
import classes from "./floating-tabs.module.css";
import { viewTransition } from "../utils/view-transition";

interface FloatingTabsProps<T extends string | number> {
  defaultValue: T;
  tabs: {
    value: T;
    title: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  }[];
  children?: (activeTab: T) => ReactElement;
  activeTab?: T;
  style?: CSSProperties;
  styles?: Partial<Record<TabsStylesNames, CSSProperties>>;
  withTransition?: boolean;
}

export const FloatingTabs = <T extends string | number>(
  props: FloatingTabsProps<T>,
) => {
  const [activeTab, setActiveTab] = useState<T>(props.defaultValue);

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  useEffect(() => {
    if (props.activeTab && activeTab !== props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  const { root: rootStyles, ...otherStyles } = props.styles ?? {};

  return (
    <Tabs
      variant="none"
      defaultValue={props.defaultValue}
      value={activeTab}
      onChange={(value) => {
        if (props.withTransition) {
          viewTransition(() => setActiveTab(value));
        } else {
          setActiveTab(value);
        }
      }}
      style={props.style}
      styles={{
        root: {
          "--tabs-display": "flex",
          "--tabs-flex-direction": "column",
          gap: 16,
          ...rootStyles,
        },
        ...otherStyles,
      }}
    >
      <Tabs.List grow ref={setRootRef} className={classes.list}>
        <FloatingIndicator
          target={activeTab ? controlsRefs[activeTab] : null}
          parent={rootRef}
          className={classes.indicator}
          transitionDuration={400}
        />
        {props.tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            ref={setControlRef(tab.value)}
            className={classes.tab}
            onClick={tab.onClick}
          >
            <Title order={4}>{tab.title}</Title>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {props.children?.(activeTab)}
    </Tabs>
  );
};
