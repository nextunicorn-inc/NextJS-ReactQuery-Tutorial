# VAC 기획 친화적인 개발 방식

## VAC란?

 - `View Asset Component`의 약자로 렌더링에 필요한 jsx와 스타일을 관리하는 컴포넌트
 - `container`, `presentational` 패턴의 진화버전
 - `ui로직`과 `view`를 분리하는 방식

## VAC가 왜 좋은데?

- ui와 ui로직을 서로 다른사람이 개발할 수 있다.(프론트 팀원 사이의 협업측면)
- ui를 기획 친화적으로 표현할 수 있다(기획직무와 개발자 사이의 협업 and 핫픽스, 기획변경시 빠르게 영향도 파악 가능)
  - 앞으로 BDD를 고려한다 했을때 쉽게 전환 가능하다고 기대함(아직 깊게 고민은 못함 ㅎㅎ
  - ) 

## VAC는 뭐가 다른데?
![img.png](img.png)

출처: https://github.com/coxcore/react-vac#readme

### 현재 우리는 어떻게 컴포넌트를 만들고 있지?
 - 보통(우리팀 포함) 비즈니스로직과 컴포넌트를 분리하지만, 컴포넌트 내에서 추가적인 ui 로직을 덧붙이곤 한다.
   - disabled는 tsx 내부에서 로직을 계산함
```tsx
// EditInterestListModal.tsx 중에서...
<Button
    text="저장하기"
    isBlock
    onClick={onClick}
    disabled={newListName === listName || !isValidNameString || newListName.length > 15}
    size="large"
    loading={editInterestListMutation.isLoading}
    data-event={INTEREST_LIST_MODAL_DATA_EVENT.modifySave}
/>
```
- 또는 props로 A형태의 데이터를 내려놓고,자식 컴포넌트에서 B의 형태로 재가공 하기도 한다.
  - 문제인 이유: selectedCompanyIdList 를 데이터로서 인지할 수 있지만, props으로 전달될때마다 데이터의 역할이 바뀐다면 코드를 파악하기 어렵다.
```tsx
    
// startup/index.page.tsx
const StartupPage = () => {
    // ...
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    // ...
    
    return (
 // ... tsx
    <HeaderLeft
        resultsNumber={total}
        selectedCompanyIdList={selectedCompanies} // A 형태의 데이터 예시
        clearSelectedList={() => setSelectedCompanies([])}
    />
    //...
    )
}
// src...// startupComponent... HeaderLeft.tsx
const HeaderLeft = ({
    resultsNumber = 0,
    selectedCompanyIdList,
    clearSelectedList,
}: {
    resultsNumber?: number;
    selectedCompanyIdList: string[];
    clearSelectedList: () => void;
}) => {
    //...
    const isDisabled = selectedCompanyIdList.length === 0; // B의 형태로 가공
    //...
    return (<>
        {/* tsx안에서 isDisabled 를 사용*/}
        </>
    )
}
//
```

### 그렇다면 VAC는 뭐가 다른데?
- props object로 props를 넘긴다.
- ui와 ui로직(비즈니스 로직)을 분리한다.
- 기획상 변경지점을 빠르게 파악한다.
- jsx에 바인딩할 데이터와 이벤트는 기획상(피그마 혹은 문서 등)에서 나타나는 형태와 매칭되게 이름을 짓는다. 

 -> 코드를 봅시다.
