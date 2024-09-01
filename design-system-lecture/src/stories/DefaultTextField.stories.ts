import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import DefaultTextField from "../components/DefaultTextField";
import deleteIcon from "../assets/ic-asset-delete-dark.svg";
const meta = {
  // title: 스토리북 사이드바에서 컴포넌트의 위치 지정.
  title: "TextFields/DefaultTextField",
  // component: 어떤 컴포넌트를 스토리로 만들지 지정
  component: DefaultTextField,
  // parameters: 스토리의 추가 설정을 지정. 여기서는 레이아웃을 중앙에 배치하도록 설정
  parameters: {
    layout: "centered",
  },
  // 자동으로 docs를 생성하도록 설정
  tags: ["autodocs"],
  // 스토리북의 컨트롤 패널에서 조작 가능한 속성들을 정의
  argTypes: {
    iconAlt: {
      control: "text",
      description: "아이콘 이미지의 alt 속성",
    },
    iconPath: {
      control: "text",
      description: "아이콘 이미지의 경로",
    },
    placeholder: {
      control: "text",
      description: "텍스트 필드의 placeholder",
    },
    value: {
      control: "text",
      description: "텍스트 필드의 값",
    },
    errorMessage: {
      control: "text",
      description: "텍스트 필드의 에러 메세지",
    },
    isError: {
      control: "boolean",
      description: "에러 상태 여부",
    },
    id: {
      control: "text",
      description: "텍스트 필드의 id",
    },
    onChange: { actions: "changed", description: "텍스트 필드 값 변경 이벤트" },
    onIconClick: { actions: "clicked", description: "버튼 클릭 이벤트" },
  },
  args: {
    onChange: fn(),
    onIconClick: fn(),
  },
} satisfies Meta<typeof DefaultTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default라는 이름의 스토리를 만들고, 초기값들을 설정
export const Default: Story = {
  args: {
    iconAlt: "icon",
    iconPath: deleteIcon,
    placeholder: "텍스트를 입력해주세요",
    value: "",
    errorMessage: "텍스트를 확인해주세요",
    isError: false,
    id: "email",
  },
};
