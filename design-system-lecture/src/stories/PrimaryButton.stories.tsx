import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import PrimaryButton from "../components/PrimaryButton";

const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "Buttons/PrimaryButton",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: PrimaryButton,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px" }}>
        <Story />
      </div>
    ),
  ],
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북의 컨트롤 패널에서 조작 가능한 속성들을 정의
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["dark", "light", "social", "text"],
      },
      description: "버튼 테마",
    },
    children: {
      control: "text",
      description: "버튼 text",
      defaultValue: "icon",
    },
    isDisabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    children: "Button",
    theme: "dark",
    isDisabled: false,
  },
};

export const Light: Story = {
  args: {
    children: "Button",
    theme: "light",
    isDisabled: false,
  },
};

export const Social: Story = {
  args: {
    children: "Button",
    theme: "social",
    isDisabled: false,
  },
};

export const Text: Story = {
  args: {
    children: "Button",
    theme: "text",
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    theme: "dark",
    isDisabled: true,
  },
};
