import { Meta, StoryObj } from "@storybook/react";
import BigButton from "@components/buttons/BigButton";

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
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ToggleButton</h1>
      </div>

      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">KakaoButton</h1>
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
