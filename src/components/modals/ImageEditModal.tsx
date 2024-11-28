import { useState } from "react";
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
import { useDeleteImage } from "@api/image/useDeleteImage";
import { useGetImage } from "@api/image/useGetImage";

interface ImageEditModalProps {
  tempId: string;
  imageEditModalClose: () => void;
  setValue: (field: "image", value: string) => void;
}

const ImageEditModal = ({ tempId, imageEditModalClose, setValue }: ImageEditModalProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteImageModal, setIsDeleteImageModal] = useState<boolean>(false);
  const [deleteImageId, setDeleteImageId] = useState<number | null>();
  const { data: imageHistory, isPending } = useGetImage(tempId);
  const { mutate: DeleteImageMutate } = useDeleteImage(tempId, setIsDeleteImageModal);

  const handleCloseModal = () => {
    imageEditModalClose();
  };

  const handleImageClick = (imageUrl: string) => {
    if (!isEdit) {
      setValue("image", imageUrl);
      imageEditModalClose();
    }
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleOpenDeleteModal = (imageId: number) => {
    setDeleteImageId(imageId);
    setIsDeleteImageModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteImageModal(false);
  };

  const handleImageDelete = () => {
    if (deleteImageId) DeleteImageMutate(deleteImageId);
  };

  return (
    <div className="flex flex-col w-[1028px] h-[646px] rounded-[30px] border p-[25px] gap-[20px] bg-white">
      {isPending || !imageHistory ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="flex relative">
            {imageHistory.length !== 0 && (
              <button
                className={`flex justify-center items-center rounded-[15px] border border-PrimaryStroke ${isEdit ? "bg-PrimaryStroke" : "bg-Primary"} text-[18px] text-Charcoal leading-[24.48px] w-[113px] h-[50px]`}
                onClick={handleEditClick}
              >
                {isEdit ? "취소" : "편집"}
              </button>
            )}
            <XIcon handleXIconClick={handleCloseModal} />
          </div>
          {imageHistory.length === 0 ? (
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
                  {imageHistory.map((image) => (
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
                        {isEdit && <CircleXIcon onClick={() => handleOpenDeleteModal(image.id)} />}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </>
      )}

      {isDeleteImageModal && (
        <ModalLayout modalClose={() => setIsDeleteImageModal(false)}>
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
