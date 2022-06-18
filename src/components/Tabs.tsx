import {FC} from 'react'
import styled from '@emotion/styled'

const TabList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ItemTab = styled.button`
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  padding: 5px 16px;
  width: 100px;
  color: #606060;
  font-size: 1rem;
  font-weight: 500;
  background-color: #fff;
  cursor: pointer;
  &.active {
    border-color: #1797ff;
    color: #1797ff;
  }
`

type TabsProps = {
  tabs: {
    label: string;
    index: number;
    Component: FC<{index: number}>
  }[];
  currentTab: number;
  onClick: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const Tabs: FC<TabsProps> = ({
  className = "tabs-component",
  tabs = [],
  currentTab = 0,
  onClick,
  orientation = "horizontal"
}) => {
  const Panel = tabs && tabs.find((tab) => tab.index === currentTab);

  return (
    <div
      className={
        orientation === "vertical" ? className + " vertical" : className
      }
    >
      <TabList role="tablist" aria-orientation={orientation}>
        {tabs.map((tab) => (
          <ItemTab
            className={currentTab === tab.index ? "active" : ""}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={currentTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={currentTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            {tab.label}
          </ItemTab>
        ))}
      </TabList>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${currentTab}`}
        id={`tabpanel-${currentTab}`}
      >
        {Panel && <Panel.Component index={currentTab} />}
      </div>
    </div>
  )
}

export default Tabs
