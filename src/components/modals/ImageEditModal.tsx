import { Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiperStyle.css";
import { Navigation, Pagination } from "swiper/modules";
import ModalLayout from "@components/modals/ModalLayout";
import DefaultModal from "@components/modals/DefaultModal";
import XIcon from "@components/iconComponents/XIcon";
import EmptyState from "../empty/EmptyState";
import CircleXIcon from "@components/iconComponents/CircleXIcon";
import { GetImageResponse } from "src/types/imageTypes";

interface ImageEditModalProps {
  images: GetImageResponse[];
  setIsImageEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setValue: (field: "image", value: string) => void;
}

const ImageEditModal = ({ images, setIsImageEditModalOpen, setValue }: ImageEditModalProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteImageModal, setIsDeleteImageModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsImageEditModalOpen(false);
  };

  const handleImageClick = (imageUrl: string) => {
    // 해당 일기의 그림 변경 api 연동
    if (!isEdit) {
      setValue("image", imageUrl);
      setIsImageEditModalOpen(false);
    }
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteImageModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteImageModal(false);
  };

  const handleImageDelete = () => {
    // 삭제 api 연동
  };

  return (
    <div className="flex flex-col w-[1028px] h-[646px] rounded-[30px] border p-[25px] gap-[20px] bg-white">
      <div className="flex relative">
        {images.length !== 0 && (
          <button
            className={`flex justify-center items-center rounded-[15px] border border-PrimaryStroke ${isEdit ? "bg-PrimaryStroke" : "bg-Primary"} text-[18px] text-Charcoal leading-[24.48px] w-[113px] h-[50px]`}
            onClick={handleEditClick}
          >
            {isEdit ? "취소" : "편집"}
          </button>
        )}
        <XIcon handleXIconClick={handleCloseModal} />
      </div>
      {images.length === 0 ? (
        <EmptyState message="생성된 그림이 없어요!" />
      ) : (
        <>
          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              modules={[Pagination, Navigation]}
              navigation={true}
            >
              {images.map((image) => (
                <SwiperSlide key={image.id} className="flex justify-center">
                  <div className="w-[800px] h-[505px] pb-[50px] pt-[30px] relative">
                    <button
                      onClick={() => handleImageClick(image.image)}
                      className={`relative group ${isEdit && "cursor-default"}`}
                    >
                      <img
                        src={image.image}
                        alt="일기 그림"
                        height={450}
                        width={800}
                        className="object-cover w-[800px] h-[450px]"
                      />
                      {!isEdit && (
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 group-active:opacity-10" />
                      )}
                    </button>
                    {isEdit && <CircleXIcon onClick={handleOpenDeleteModal} />}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      {isDeleteImageModal && (
        <ModalLayout setIsModalOpen={setIsDeleteImageModal}>
          <DefaultModal
            title="이 그림을 삭제할까요?"
            leftText="넹"
            rightText="아니용"
            leftClick={handleImageDelete}
            rightClick={handleCloseDeleteModal}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default ImageEditModal;
