import { ChangeEvent, useId, useState } from 'react';
import Layout from '../src/layout';

const dataEventInstance = {
  sendEvent: ({ eventName, someProps }: { eventName: string; someProps?: string }) =>
    console.log(eventName, someProps),
};

interface CountAndButtonsUIProps {
  isShown: boolean;
  step: number;
  onClickIncreaseAsStep: () => void;
  onClickDecreaseAsStep: () => void;
  countTitle: string;
  countContentStyle: Record<string, string>;
  countContent: string;
}
const CountAndButtonsUI = ({
  isShown,
  step,
  onClickDecreaseAsStep,
  onClickIncreaseAsStep,
  countTitle,
  countContentStyle,
  countContent,
}: CountAndButtonsUIProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '20px',
    }}
  >
    <button
      type={'button'}
      onClick={onClickIncreaseAsStep}
      style={{
        backgroundColor: 'gray',
        width: 100,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{step}만큼 증가</span>
    </button>
    <span>
      {isShown && <span>{countTitle}</span>}
      <span style={countContentStyle}>{countContent}</span>
    </span>
    <button
      type={'button'}
      onClick={onClickDecreaseAsStep}
      style={{
        backgroundColor: 'gray',
        width: 100,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{step}만큼 감소</span>
    </button>
  </div>
);

interface CountStepInputUIProps {
  step: number;
  onChangeStepInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickStepReset: () => void;
}
const CountStepInputUI = ({ step, onClickStepReset, onChangeStepInput }: CountStepInputUIProps) => {
  const id = useId();
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <label htmlFor={id}>스텝</label>
      <input itemID={id} value={step} onChange={onChangeStepInput} />
      <button type={'button'} onClick={onClickStepReset}>
        스텝 초기화
      </button>
    </div>
  );
};

const calculateColor = (count: number) => {
  if (count === 0 || (count % 2 === 0 && count % 5 === 0)) {
    return 'unset';
  }
  if (count % 2 === 0) {
    return 'red';
  }
  if (count % 5 === 0) {
    return 'blue';
  }
  return 'unset';
};
const isShowCount = (count: number) => count === 0 || count % 2 !== 0 || count % 5 !== 0;

const useCountStepInputUIController = (): CountStepInputUIProps => {
  const [step, setStep] = useState(1);
  const onChangeStepInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === undefined) return;
    if (value === null) return;
    if (Number.isNaN(Number(value))) return;
    setStep(Number(value));
  };
  const onClickStepReset = () => {
    setStep(1);
    dataEventInstance.sendEvent({ eventName: '스텝 리셋버튼 클릭' });
  };

  return {
    step,
    onClickStepReset,
    onChangeStepInput,
  };
};

const VacComplexCounterPage = () => {
  const countStepInputUIController = useCountStepInputUIController();
  const { step } = countStepInputUIController;
  const [count, setCount] = useState(0);
  const onClickIncreaseAsStep = () => setCount(p => p + step);
  const onClickDecreaseAsStep = () => {
    if (count - step < 0) return;
    setCount(p => p - step);
  };
  const countTitle = isShowCount(count) ? '카운트:' : '';
  const countContent = isShowCount(count) ? count.toString() : '😂';
  const countContentStyle = { color: calculateColor(count) };

  const countAndButtonsUIProps: CountAndButtonsUIProps = {
    step,
    isShown: isShowCount(count),
    countTitle,
    countContent,
    countContentStyle,
    onClickIncreaseAsStep,
    onClickDecreaseAsStep,
  };

  return (
    <Layout>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div>
          <h1>카운터</h1>
          <p>버튼 ui를 타원으로 만든다. (ui만 변경)</p>
          <p>카운트는 0보다 작을 수 없다. (ui 로직만 변경)</p>
          <br />
          <p>둘 다 변경</p>
          <p>
            2의 배수는 <span style={{ color: 'red' }}>빨간색</span>
          </p>
          <p>
            5의 배수는 <span style={{ color: 'blue' }}>파란색</span>
          </p>
          <p>2와 5의 공배수는 숫자 대신 😂 모양을 보여주고 </p>
          <p>그 외는 흰색</p>
        </div>
        <CountStepInputUI {...countStepInputUIController} />
        <CountAndButtonsUI {...countAndButtonsUIProps} />
      </main>
    </Layout>
  );
};

export default VacComplexCounterPage;
