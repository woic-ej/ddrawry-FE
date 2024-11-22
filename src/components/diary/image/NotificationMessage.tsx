interface Props {
  count: number;
  isError: boolean;
}

const NotificationMessage = ({ count, isError }: Props) => {
  if (isError) {
    return <div className="regularCaption-font">오류가 발생했어요 ㅠㅠ 다시 그려보세요!</div>;
  }

  if (count > 0) {
    return (
      <div className="body-font">
        ( 오늘 생성 가능 횟수 :{" "}
        <span className={`${count > 1 ? "text-Primary" : "text-Red"}`}>{count}회</span> )
      </div>
    );
  } else {
    return (
      <div className="regularCaption-font">
        오늘 그림 생성 기회를 다 써버렸어요 ㅠㅠ <br />
        내일 다시 오면 그릴 수 있어요!
      </div>
    );
  }
};

export default NotificationMessage;
