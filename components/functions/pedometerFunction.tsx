// 스텝에 따라 이미지가 변경되는 함수
export const SelectStepImage = (steps: number) => {
  if (0 <= steps && steps < 2000) {
    return 'step1';
  } else if (steps < 4000) {
    return 'step2'
  } else if (steps < 6000) {
    return 'step3';
  } else if (steps < 8000) {
    return 'step4';
  } else if (steps < 10000) {
    return 'step5';
  } else {
    return 'step6';
  }
};

// 스텝에 따른 거리
export function CalculateKillometer(step: number) {
  return ((step * 0.4) / 1000).toFixed(2);
}

// 스텝에 따른 칼로리
export function CalculateCalorie(step: number) {
  return (step * 0.0336).toFixed(1);
}