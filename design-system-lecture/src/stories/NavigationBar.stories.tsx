import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "../components/NavigationBar";
import { fn } from "@storybook/test";
const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "Navigation/NavigationBar",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: NavigationBar,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],

  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  // 스토리북의 컨트롤 패널에서 조작 가능한 속성들을 정의
  argTypes: {
    isDark: {
      control: "boolean",
      description: "다크모드 여부",
    },
    showBackButton: {
      control: "boolean",
      description: "뒤로가기 버튼 표시 여부",
    },
    showCloseButton: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    showTitle: {
      control: "boolean",
      description: "페이지 이름 표시 여부",
    },
    title: {
      control: "text",
      description: "페이지 타이틀",
    },
  },
  args: {
    onBackButtonClick: fn(),
    onCloseButtonClick: fn(),
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default라는 이름의 스토리를 만들고, 초기값들을 설정
export const Default: Story = {
  args: {
    showBackButton: true,
    showCloseButton: true,
    showTitle: true,
    isDark: false,
    title: "타이틀",
  },
};
