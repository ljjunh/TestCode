import type { Meta, StoryObj } from "@storybook/react";
import Label from "../components/Label";

const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "Text/Label",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: Label,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북 컨트롤 패널에서 조작 가능한 속성들을 정의
  // htmlFor과 children 모두 텍스트 입력 필드로 조작
  argTypes: {
    htmlFor: { control: "text", description: "label의 for 속성" },
    children: { control: "text", description: "label의 내용" },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default라는 이름의 스토리를 만들고, 초기값으로 htmlFor는 "username",
// children은 "이메일"로 설정
export const Default: Story = {
  args: {
    htmlFor: "username",
    children: "이메일",
  },
};
