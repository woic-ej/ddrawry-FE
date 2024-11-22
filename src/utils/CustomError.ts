export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // 부모 클래스인 Error의 message 속성 설정
    this.statusCode = statusCode; // 커스텀 상태 코드 추가
    this.name = "CustomError"; // 에러 이름 설정
  }
}
