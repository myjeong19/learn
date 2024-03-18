import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  // 저장된 만료 시간에 접근
  const expirationDate = new Date(storedExpirationDate);
  // 접근한 값을 Date 객체로 변환
  const now = new Date();
  // 현재 시간

  const duration = expirationDate.getTime() - now.getTime();
  // 만료 시간 - 현재 시간 = 남은 시간 (만료시 음수 반환)

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  // 유효시간

  if (tokenDuration < 0) {
    return 'EXPIRED';
    // 로그아웃을 트리거 하기 위해 사용함.
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
};
