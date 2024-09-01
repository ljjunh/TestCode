import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import TagList from "../components/TagList";
const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "List/TagList",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: TagList,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북의 컨트롤 패널에서 조작 가능한 속성들을 정의
  argTypes: {
    tagList: {
      control: "array",
      description: "태그 리스트",
      defaultValue: ["tag1", "tag2", "tag3"],
    },
  },
  args: {
    onTagClick: fn(),
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tagList: ["tag1", "tag2", "tag3"],
  },
};
