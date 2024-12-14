import { IconPropsType } from "src/types/IconPropsType";

const AngryIcon = ({ isClick }: IconPropsType) => {
  return (
    <svg className="icon-style" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.7227 4.15244C9.51904 4.15244 4.47266 9.00207 4.47266 14.9638C4.47266 20.9255 9.51904 25.7752 15.7227 25.7752C21.9263 25.7752 26.9727 20.9255 26.9727 14.9638C26.9727 9.00207 21.9263 4.15244 15.7227 4.15244ZM15.7227 5.95433C20.9119 5.95433 25.0977 9.97692 25.0977 14.9638C25.0977 19.9507 20.9119 23.9733 15.7227 23.9733C10.5334 23.9733 6.34766 19.9507 6.34766 14.9638C6.34766 9.97692 10.5334 5.95433 15.7227 5.95433ZM10.7422 11.36C10.3467 11.7436 10.0977 12.268 10.0977 12.8522C10.0977 14.0171 11.0828 14.9638 12.2949 14.9638C12.8992 14.9638 13.4521 14.728 13.8477 14.3444L10.7422 11.36ZM20.7031 11.36L17.5977 14.3444C17.9932 14.728 18.5461 14.9638 19.1504 14.9638C20.3625 14.9638 21.3477 14.0171 21.3477 12.8522C21.3477 12.2715 21.1023 11.7401 20.7031 11.36ZM18.125 16.6249C17.9895 16.6284 17.8467 16.6355 17.7148 16.6531C16.6638 16.8044 15.8691 17.357 15.166 17.8074C14.4629 18.2579 13.844 18.6098 13.3789 18.6802C12.9138 18.7506 12.4963 18.6802 11.709 17.92L10.3613 19.2152C11.4233 20.2428 12.6318 20.6123 13.6719 20.454C14.7119 20.2956 15.4919 19.7466 16.1914 19.2996C16.8909 18.8527 17.4915 18.5254 17.9785 18.455C18.4656 18.3846 18.9453 18.4444 19.7656 19.2152L21.0547 17.92C20.0952 17.0191 19.0735 16.6109 18.125 16.6249Z"
        fill={isClick ? "#E7C7E7" : "#000000"}
      />
    </svg>
  );
};

export default AngryIcon;