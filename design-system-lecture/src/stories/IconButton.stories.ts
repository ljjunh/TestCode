import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import IconButton from "../components/IconButton";
import deleteIcon from "../assets/ic-asset-delete-dark.svg";
const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "Buttons/IconButton",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: IconButton,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북의 컨트롤 패널에서 조작 가능한 속성들을 정의
  // alt와 iconPath는 스토리북에서 텍스트 입력으로 조작하고
  // onClick은 스토리북의 Actions 탭에서 이벤트가 발생했을 때 로깅을 활성화(로그를 통해 개발자는 이벤트 핸들러가 제대로 연결되었는지 확인)
  argTypes: {
    alt: {
      control: "text",
      description: "이미지의 alt 속성",
    },
    iconPath: {
      control: "text",
      description: "이미지의 경로",
    },
    onClick: { action: "clicked", description: "버튼 클릭 이벤트" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default라는 이름의 스토리를 만들고, 초기값으로 htmlFor는 "username",
// children은 "이메일"로 설정
export const Default: Story = {
  args: {
    alt: "icon",
    iconPath: deleteIcon,
  },
};
