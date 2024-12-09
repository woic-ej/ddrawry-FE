import { Meta, StoryObj } from "@storybook/react";
import DefaultModal from "./DefaultModal";
import { useState } from "react";
import ChangeNameModal from "./ChangeNameModal";
import ProfileModal from "./ProfileModal";
import { BrowserRouter as Router } from "react-router-dom";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log(isModalOpen);
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">DefaultModal</h1>
        <DefaultModal
          title="회원탈퇴를 하시겠습니까?"
          leftText="네"
          rightText="아니요"
          leftClick={() => {
            return;
          }}
          rightClick={() => setIsModalOpen(false)}
        />
        <DefaultModal
          title="로그아웃을 하시겠습니까?"
          leftText="네"
          rightText="아니요"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title="짱 멋진 일기를 어떻게 자랑할까요?"
          leftText="이미지로"
          rightText="링크로"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title="이 그림을 삭제할까요?"
          leftText="넹"
          rightText="아니용"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title="앗 이 일기를 지울까요?"
          leftText="넹"
          rightText="아니용"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title={
            "그림을 그리면 오늘 생성 가능 횟수가 소진돼요!\n띠로리에게 그림을 그려달라고 할까요?"
          }
          leftText="넹"
          rightText="아니용"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title="이대로 일기를 저장할까요?"
          leftText="넹"
          rightText="아니용"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
        <DefaultModal
          title="일기를 초기화 할까요?"
          leftText="넹"
          rightText="아니용"
          leftClick={() => {
            return;
          }}
          rightClick={() => {
            return;
          }}
        />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ChangeNameModal</h1>
        <ChangeNameModal currentName="재로" changeModalClose={() => setIsModalOpen(false)} />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-16 bg-white w-fit p-4">ProfileModal</h1>
        <ProfileModal />
      </div>
    </div>
  );
}

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};
