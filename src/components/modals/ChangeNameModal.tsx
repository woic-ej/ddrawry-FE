import { useChangeNickname } from "@api/users/useChangeNickname";
import ModalButton from "@components/buttons/ModalButton";
import React, { useState } from "react";

interface ChangeNameModalProps {
  currentName: string;
  changeModalClose: () => void;
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({ currentName, changeModalClose }) => {
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const changeName = useChangeNickname(newName, changeModalClose);

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const isValid = /^[a-zA-Z가-힣]*$/.test(inputValue);
    if (isValid && inputValue.length <= 5) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setNewName(inputValue.slice(0, 5));
    setErrorMessage("");
  };

  const handleChangeNameClick = () => {
    if (newName === "") {
      changeModalClose();
      return;
    }
    if (!isNameValid) {
      setErrorMessage("닉네임은 1글자 이상 5글자 이하로 영문자, 한글만 허용");
      return;
    }
    changeName.mutate();
  };

  return (
    <div
      className="flex flex-col relative bg-white w-[300px] md:w-[400px] lg:w-[450px] lg:h-[300px] rounded-[30px] gap-[30px] p-[30px] border body-font text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div>닉네임 수정하기</div>
      <div className="flex flex-col items-start gap-[10px] lg:gap-[20px] ">
        <div>현재 닉네임 : {currentName}</div>
        <div className="flex gap-[5px] items-center relative">
          <span>바꿀 닉네임 : </span>
          <input
            type="text"
            className={`w-2/5 h-[40px] border ${errorMessage === "" ? "border-ButtonDisabledStroke} " : "border-[#F46666]"} rounded-[10px] p-[10px]`}
            onChange={handleChangeNickname}
            value={newName}
          />
        </div>
        <div className="text-small text-left text-[#F46666]">{errorMessage}</div>
      </div>
      <div className="flex justify-end">
        <ModalButton title="바꾸기" onClick={handleChangeNameClick} />
      </div>
    </div>
  );
};

export default ChangeNameModal;
