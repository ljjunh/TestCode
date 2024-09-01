import type { Meta, StoryObj } from "@storybook/react";
import ErrorMessage from "../components/ErrorMessage";

const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "Text/ErrorMessage",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: ErrorMessage,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북 컨트롤에 패널서 조작 가능한 속성들을 정의
  // children : 텍스트 입력 필드로 조작
  argTypes: {
    children: { control: "text", description: "ErrorMessage의 내용" },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default라는 이름의 스토리를 만들고
// children의 초기값으로 "에러 메세지는 여기로" 설정
export const Default: Story = {
  args: {
    children: "에러 메세지는 여기로",
  },
};
