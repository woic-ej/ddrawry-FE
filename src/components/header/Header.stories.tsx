import { Meta, StoryObj } from "@storybook/react";
import DefaultHeader from "@components/header/DefaultHeader";
import HeaderWithLike from "@components/header/HeaderWithLike";
import HeaderWithProfile from "@components/header/HeaderWithProfile";

function Header() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">DefaultHeader</h1>
        <DefaultHeader title="띠로리" />
        <DefaultHeader title="일기 쓰기" />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">HasLikeHeader</h1>
        <HeaderWithLike />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">HasProfileHeader</h1>
        <HeaderWithProfile title="띠로리" />
        <HeaderWithProfile title="좋아요한 일기들" />
        <HeaderWithProfile title="일기 검색하기" />
      </div>
    </div>
  );
}

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
