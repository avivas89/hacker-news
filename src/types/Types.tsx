import {FC} from 'react'

export type CardTypes = {
  title: string
  url: string
  created_at: string
  click: any
  favorite?: boolean
};

export type FilterNewsTypes = {
  filterNews: any
  setFilterNews: Function
}

export type formatOptionLabel = {
  label: string
  image: string
}

export type TabsProps = {
  tabs: {
    label: string;
    index: number;
    Component: FC<{index: number}>
  }[];
  currentTab: number;
  onClick: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  filterNews?: string
}
