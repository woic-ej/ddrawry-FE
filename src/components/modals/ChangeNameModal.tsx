import ModalButton from "@components/buttons/ModalButton";
import React, { Dispatch, SetStateAction, useState } from "react";

interface ChangeNameModalProps {
  currentName: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({ currentName, setIsModalOpen }) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const isValid = /^[a-zA-Z가-힣]*$/.test(inputValue);
    if (isValid && inputValue.length <= 5) {
      setIsNameValid(true);
    }
    setNewName(inputValue.slice(0, 5));
  };

  const handleClick = () => {
    if (newName === '') {
      setIsModalOpen(false);
      return;
    }
    if (!isNameValid) {
      alert("닉네임은 1글자 이상 5글자 이하로 영문자, 한글만 허용됩니다.");
      return;
    }
    // api 연동
    setIsModalOpen(false);
  };

  return (
    <div
      className="flex flex-col relative bg-white w-[683px] h-[453px] rounded-[30px] gap-[78px] p-[30px] border font-[400] body-font leading-[38.08px] text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div>닉네임 수정하기</div>
      <div className="flex flex-col items-start gap-[20px] pl-[50px]">
        <div>현재 닉네임 : {currentName}</div>
        <div className="flex gap-[10px] items-center">
          <span>바꿀 닉네임 : </span>
          <input
            type="text"
            className="w-[190px] h-[56px] border border-ButtonDisabledStroke rounded-[10px] p-[10px]"
            onChange={handleChangeNickname}
            value={newName}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <ModalButton title="바꾸기" onClick={handleClick} />
      </div>
    </div>
  );
};

export default ChangeNameModal;
