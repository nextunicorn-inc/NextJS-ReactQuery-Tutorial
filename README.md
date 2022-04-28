# NextJS-Tutorial

## 개요
- 모든 컨텐츠 렌더링이 클라이언트 사이드에서만 일어나므로, 화면이 사용자에게 보이기까지 엄청난 시간이 소요됩니다.
- 컨텐츠 SEO의 문제는 검색 엔진이 컨텐츠를 처리하는 비용이 큽니다.

> Next.js는 이 문제들을 SSR, `static pre-rendering`이라 부르는 서버 렌더링(Server Rendering)으로 해결합니다!

<br>

## 목차
### 튜토리얼
- 주요 기능
- 라우터로 동적 콘텐츠 로드
- Prefetching
- router를 사용하여 선택된 링크 감지
- next/router 사용법
- getInitialProps()를 통해 컴포넌트에 데이터 보내기
- CSS
- custom 태그로 head 태그 옮기기
- wrapper 컴포넌트 추가하기
- API 라우팅
- 코드를 서버사이드 혹은 클라이언트 사이드에서 실행하기
- 운영 버전으로 배포하기
- now로 배포하기
- 앱 번들 파일 분석
- 지연 로딩 모듈

<br>

### 기능 구현하기

<br>

## 튜토리얼
### 주요 기능
- Hot Code Reloading : 디스크에 변화가 생기면 Next.js는 페이지를 리로드합니다.
- Automatic Routing : `pages` 폴더에 있는 파일에 대해 어떤 URL이라도 파일 시스템에 매핑됩니다.
- Single File Components : 컴포넌트 영역에 스타일을 추가할 수 있습니다.
- Server Rendering : 클라이언트로 HTML을 전송하기 전에 서버에서 리액트 컴포넌트를 렌더링할 수 있습니다.
- Ecosystem Compatibility : 자바스크립트, 노드, 리액트 생태계에 잘 흡수되어 있습니다.
- Automatic Code Splitting : 페이지들은 자신이 필요로 하는 자바스크립트 파일과 라이브러리들만 렌더링합니다. 모든 app 코드가 함축된 하나의 자바스크립트 파일이 아닌, 다른 리소스들로 해체됩니다. 페이지를 로딩하면 오로지 `해당 페이지에 필요한 자바스크립트를 로드`합니다. 단, 전체 사이트 화면의 최소 절반이 쓰는, 주기적인 자바스크립트 파일과 라이브러리는 메인 자바스크립트 번들로 이동됩니다.
- Prefetching : 두 개의 다른 페이지를 연결하는 Link 컴포넌트는 백그라운드에서 자동으로 페이지 리소스(코드 스플리팅에 의해 분리된 코드를 포함하여)를 사전에 fetch하는 prefetch 프로퍼티를 지원합니다.
- Dynamic Components : 자바스크립트 모듈, 리액트 컴포넌트를 동적으로 import 할 수 있습니다.
- TypeScript Support : Next.js는 타입스크립트로 만들어졌으므로 타입스크립트를 잘 지원합니다.

<br>
