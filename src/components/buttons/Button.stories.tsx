import { Meta, StoryObj } from "@storybook/react";
import BigButton from "@components/buttons/BigButton";
import SmallButton from "@components/buttons/SmallButton";
import ModalButton from "./ModalButton";
import KakaoButton from "./KakaoButton";
import ToggleButton from "./ToggleButton";

function Button() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">BigButton</h1>
        <BigButton text="일기 자랑하기" color="blue" />
        <BigButton text="홈으로 이동하기" color="blue" />
        <BigButton text="일기 저장하기" color="yellow" />
        <BigButton text="일기 저장하기" color="gray" />
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">SmallButton</h1>
        <SmallButton title="수정하기" color="green" />
        <SmallButton title="일기 초기화" color="green" />
        <SmallButton title="지우기" color="green" />
        <SmallButton title="그림 지우기" color="green" />
        <SmallButton title="그림 그려줘!" color="green" />
        <SmallButton title="그림 그려줘!" color="gray" />
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ModalButton</h1>
        <ModalButton title="넹" />
        <ModalButton title="이미지로" />
        <ModalButton title="아니용" />
        <ModalButton title="링크로" />
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ToggleButton</h1>
        <ToggleButton leftTitle="캘린더형" rightTitle="목록형" />
        <ToggleButton leftTitle="전체보기" rightTitle="날짜별" />
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">KakaoButton</h1>
        <KakaoButton
          onClick={() => {
            return;
          }}
        />
      </div>
    </div>
  );
}

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};
