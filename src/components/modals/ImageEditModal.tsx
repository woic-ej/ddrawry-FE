import React, { Dispatch, SetStateAction, useState } from "react";
import XIcon from "@assets/svgs/XIcon.svg";
import CircleXIcon from "@assets/svgs/CircleXIcon.svg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperStyle.css";
import { Navigation, Pagination } from "swiper/modules";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import LogoTextOnly from "@assets/images/logoTextOnly.png";

interface ImageEditModalProps {
  images: string[];
  setIsImageEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({ images, setIsImageEditModalOpen }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteImageModal, setIsDeleteImageModal] = useState<boolean>(false);
  const handleImageClick = () => {
    // 해당 일기의 그림 변경 api 연동
    setIsImageEditModalOpen(false);
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleImageDelete = () => {
    // 삭제 api 연동
  };

  return (
    <div className="flex flex-col w-[1028px] h-[646px] rounded-[30px] border p-[25px] gap-[40px]">
      {images.length === 0 ? (
        <div className="relative flex flex-col h-[100%] justify-center items-center gap-[30px]">
          <img src={LogoTextOnly} width={275} height={76} alt="LogoText" />
          <div className="font-[400] text-[36px] text-Gray leading-[48.96px]">
            생성된 그림이 없어요!
          </div>
          <img
            src={XIcon}
            width={32}
            height={32}
            alt="XIcon"
            onClick={() => setIsImageEditModalOpen(false)}
            className="cursor-pointer absolute top-0 right-0"
          />
        </div>
      ) : (
        <>
          <div className="flex relative">
            <button
              className={`flex justify-center items-center rounded-[15px] border border-PrimaryStroke font-[400] ${isEdit ? "bg-PrimaryStroke" : "bg-Primary"} text-[18px] text-Charcoal leading-[24.48px] w-[113px] h-[50px]`}
              onClick={handleEditClick}
            >
              {isEdit ? "취소" : "편집"}
            </button>
            <img
              src={XIcon}
              width={32}
              height={32}
              alt="XIcon"
              onClick={() => setIsImageEditModalOpen(false)}
              className="cursor-pointer absolute top-0 right-0"
            />
          </div>
          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              modules={[Pagination, Navigation]}
              navigation={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className=" w-[800px] h-[505px] pb-[50px] pt-[30px]">
                    <img
                      src={image}
                      alt="일기 그림"
                      height={450}
                      width={800}
                      className="object-fill w-[800px] h-[450px] cursor-pointer"
                      onClick={handleImageClick}
                    />
                    {isEdit && (
                      <img
                        src={CircleXIcon}
                        alt="CircleXIcon"
                        width={42}
                        height={42}
                        className="absolute cursor-pointer right-[68px] top-[10px] z-10 "
                        onClick={() => setIsDeleteImageModal(true)}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {isDeleteImageModal && (
              <ModalLayout setIsModalOpen={setIsDeleteImageModal}>
                <DefaultModal
                  title="이 그림을 삭제할까요?"
                  leftText="넹"
                  rightText="아니용"
                  leftClick={handleImageDelete}
                  rightClick={() => setIsDeleteImageModal(false)}
                />
              </ModalLayout>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEditModal;
