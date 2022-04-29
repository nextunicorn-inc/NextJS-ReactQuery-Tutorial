# NextJS-Tutorial

## 개요
- 모든 컨텐츠 렌더링이 클라이언트 사이드에서만 일어나므로, 화면이 사용자에게 보이기까지 엄청난 시간이 소요됩니다.

- 컨텐츠 SEO의 문제는 검색 엔진이 컨텐츠를 처리하는 비용이 큽니다.

- **Next.js는 이 문제들을 SSR, `static pre-rendering`이라 부르는 서버 렌더링(Server Rendering)으로 해결합니다!**

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

- 지연 로딩 모듈

<br>

### 기능 구현하기
- // TODO

<br>

## 튜토리얼
### 주요 기능
- **Hot Code Reloading** : 디스크에 변화가 생기면 Next.js는 페이지를 리로드합니다.

- **Automatic Routing** : `pages` 폴더에 있는 파일에 대해 어떤 URL이라도 파일 시스템에 매핑됩니다.

- **Single File Components** : 컴포넌트 영역에 스타일을 추가할 수 있습니다.

- **Server Rendering** : 클라이언트로 HTML을 전송하기 전에 서버에서 리액트 컴포넌트를 렌더링할 수 있습니다.

- **Ecosystem Compatibility** : 자바스크립트, 노드, 리액트 생태계에 잘 흡수되어 있습니다.

- **Automatic Code Splitting** : 페이지들은 자신이 필요로 하는 자바스크립트 파일과 라이브러리들만 렌더링합니다. 모든 app 코드가 함축된 하나의 자바스크립트 파일이 아닌, 다른 리소스들로 해체됩니다. 페이지를 로딩하면 오로지 `해당 페이지에 필요한 자바스크립트를 로드`합니다. 단, 전체 사이트 화면의 최소 절반이 쓰는, 주기적인 자바스크립트 파일과 라이브러리는 메인 자바스크립트 번들로 이동됩니다.

- **Prefetching** : 두 개의 다른 페이지를 연결하는 Link 컴포넌트는 백그라운드에서 자동으로 페이지 리소스(코드 스플리팅에 의해 분리된 코드를 포함하여)를 사전에 fetch하는 prefetch 프로퍼티를 지원합니다.

- **Dynamic Components** : 자바스크립트 모듈, 리액트 컴포넌트를 동적으로 import 할 수 있습니다.

- **TypeScript Support** : Next.js는 타입스크립트로 만들어졌으므로 타입스크립트를 잘 지원합니다.

<br>

### 라우터로 동적 컨텐츠 로드하기
> Next.js는 동적 컨텐츠를 Dynamic URL에 기반하여 제공합니다.

- `[]` 문법으로 동적 페이지를 생성하는 동적 URL을 만들 수 있어요.
  - `pages/blog/[id].js` 파일을 추가하면, 이 파일은 `/blog/nu, /blog/finder` 등의 /blog 경로 하위의 동적 URL들을 처리합니다.
  
  - 파일명에서 대괄호 안의 `[id]`는 동적인 어떤 것이든 router의 쿼리 파라미터로서 id 파라미터에 담길 수 있습니다.

<br>

- router는 Next.js에서 제공하는 `next/router`에서 import 할 수 있습니다.
  ```js
  const router = useRouter();
  ```
  
  - `router.query.id`로 `[id].js`의 URL의 동적 부분을 가져올 수 있습니다.

<br>

- 해당 id 파라미터는 데이터베이스에 저장된 데이터의 인덱스 등을 통해 접근할 수도 있습니다.
  ```js
  export default () => {
    const router = useRouter();
    const data = SomethingDataList[router.query.id];
    
    return (
      <>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </>
    )
  }
  ```
  
  - 그러나 화면에 접근하면 에러가 발생합니다! 왜 이럴까요? 바로 `렌더링 도중 컴포넌트를 초기화할 때 데이터는 아직 해당 컴포넌트에 존재하지 않기 때문입니다.`
    - 방어 코드로 이런 상황을 제어할 수 있지만, 근본적인 해결책이 되진 않습니다.

<br>

- getInitialProps로 컴포넌트에 데이터를 주입할 수 있습니다.

<br>

### Prefetching
> Next.js의 Link 컴포넌트에 의해, 프론트엔드는 새로운 client/server 요청과 응답을 트리거하지 않고 새 페이지를 띄웁니다.

- `<Link />`로 감싼 어떤 html 요소는 viewport에 나타납니다. 즉, 웹 사용자에게 보여질 수 있으며, Next.js는 이 링크가 `지역 링크인 한` 해당 요소를 가리키는 URL을 prefetch 하는데 이 점은 사용자가 원하는 화면을 더욱 빠르게 보여질 수 있도록 합니다.

<br>

- 이 이점은 반드시 **운영 모드(Production)** 에서만 발생합니다.
  - prefetch를 확인하기 위해서는 `npm run dev`가 아니라 `npm run build && npm run start`로 실행해야 합니다.

<br>

- 개발자 도구의 Network 패널을 보면, 페이지가 로드될 때 화면의 모든 `<Link />`들은 Load 이벤트가 발생하자마자 prefetch하는 것을 확인할 수 있습니다.
  - 즉, 페이지가 완전히 로드될 때 prefetch가 트리거되고, `DOMContentLoaded` 이벤트가 완료된 후 발생하는 것이죠.
  
  - viewport 내의 다른 Link 태그들은 사용자가 스크롤을 할 때 prefetch 되기 시작합니다.
  
  - prefetch는 브라우저가 Save-Data HTTP 헤더(데이터를 절약하고자 userAgent에 설정하는 것)를 전송하지 않는 한 가장 빠른 인터넷 연결로 이루어집니다.
  
  - Link 태그에 prefetch를 false로 설정하면 개별 Link마다 prefetch 설정을 해제할 수 있습니다.

<br>

### router를 사용하여 선택된 링크 감지하기
> 현재 URL에 따라 선택된 Link 태그에 클래스명을 할당하려면 어떻게 해야 할까요?

- Next.js의 Link 태그는 이를 자동으로 해주진 않습니다. 단, Link 태그를 감싸 훅으로 wrapping 한 특정 컴포넌트를 생성하여 사용할 수 있죠!

<br>

### next/router 사용법
> 코드 레벨에서 라우팅을 변경하려면 어떻게 해야 할까요?

- next/router 패키지의 Router를 이용하여 내부 메서드를 호출할 수 있습니다.
  - 이 Router는 클라이언트에 존재하므로 메서드는 반드시 프론트엔드 코드에서만 사용되어야 합니다.
  
  - 이를 보장할 수 있는 방법은 `useEffect()` 리액트 훅으로 감싸거나 리액트의 stateful 컴포넌트의 `componentDidMount()` 내에서 사용하는 것이죠.

<br>

- `push()`는 프론트엔드에서 프로그램 URL을 변경시킵니다.
  ```js
  router.push('/login');
  ```

<br>

- `prefetch()`는 프로그램이 URL을 prefetch하도록 하며, Link 태그가 없을 때 유용합니다.
  ```js
  router.prefetch('/login');
  ```

<br>

- 라우터 변경 이벤트를 감지하는 데에 라우터를 사용할 수도 있습니다.

<br>

### getInitialProps()를 통해 컴포넌트에 데이터 주입하기
> 동적 라우터를 어떻게 SSR로 동작하도록 할까요?

- 컴포넌트 바로 뒤에 getInitialProps()라는 함수를 추가해 props가 존재하는 컴포넌트를 만들어야 합니다.
  ```js
  const Data = props => {
    return (
      <>
        <h1>{props.data.title}</h1>
        <p>{props.data.content}</p>
      </>
    )
  };

  Data.getInitialProps = ({ query }) => {
    return {
      data: SomethingDataList[query.id];
    }
  };
  ```
  - 에러 없이 SSR로 동작합니다!

<br>

- `getInitialProps()` 함수는 Link 태그를 사용하여 새 페이지를 탐색할 때 서버/클라이언트 양쪽 모두에서 실행됩니다.
  - 클라이언트에서는 query 객체, pathname, asPath 등을 컨텍스트에서 가져옵니다. 
  
  - 서버에서는 req(요청 객체), res(응답 객체), err(에러 객체)를 컨텍스트에서 가져옵니다.

<br>

### CSS
> 이 장은... @emotion을 채택하므로 넘어갈게요!

- Next.js 내부에 styled-jsx가 내장되어, 컴포넌트 단위 스타일링이 가능합니다.

<br>

### custom 태그로 head 태그 옮기기
> Next.js 페이지 컴포넌트에 페이지 header로 정보를 수정할 수 있습니다.
> - 페이지 제목을 커스터마이징하고 싶을 때
> - meta 태그를 변경하고 싶을 때

- 모든 컴포넌트 내부에 next/head로부터 Head 컴포넌트를 import하여 컴포넌트 JSX Element에 포함시킬 수 있습니다.
  ```js
  import Head from 'next/head';

  const Home = props => (
    <div>
      <Head>
        <title>새로운 페이지 타이틀</title>
      </Head>
      {/* ... */}
    </div>
  )
  ```
  - Head 태그 하위에 나타내고 싶은 어떤 HTML 태그라도 추가할 수 있습니다.

<br>

- Next.js가 컴포넌트를 마운팅할 때 Next.js는 Head 내의 태그들을 페이지의 헤더에 포함시킵니다.
  - 마찬가지로 Next.js가 컴포넌트를 언마운팅할 때 Next.js는 해당 태그들을 제거하죠.

<br>

### wrapper 컴포넌트 추가하기
> 대부분의 페이지는 비슷한데... Next.js에서는 공통된 컴포넌트를 작업할 수 있는 방법이 있습니다.

- 고차 컴포넌트(Higher Order-Component)를 사용하는 방법입니다.
  ```js
  // components/Layout.js
  export default Page => {
    return () => (
      <div>
        {/* jsx */}
      </div>
    )
  };
  ```
  - 해당 내부 안에 각 컴포넌트들을 import하여 Header, Sidebar로 불러오거나 CSS를 추가할 수 있습니다.
  
  - 그리고 이렇게 사용할 수 있죠.
    ```js
    import withLayout from '../components/Layout.js';

    const Page = () => <p>새로운 페이지!</p>;

    export default withLayout(Page);
    ```
  
  - 하지만 고차 컴포넌트는 `getInitialProps()`를 사용할 필요가 없는 간단한 상황에서만 동작합니다. 왜...?
  
  - getInitialProps() 함수는 Page 컴포넌트에서만 호출할 수 있습니다. 고차 컴포넌트를 사용하여 페이지에 export한다면, Page.getInitialProps()는 사용할 수 없습니다.

<br>

- props를 활용하는 방법입니다.
  ```js
  export default props => (
    <div>
      {/* jsx */}
    </div>
  );
  ```
  - 단지 content 속성에 컴포넌트 JSX를 작성하는 방법으로 Page 컴포넌트에 getInitialProps()를 사용할 수 있습니다.
    ```js
    import Layout from '../components/Layout.js';

    const Page = () => (
      <Layout content={(<p>새로운 페이지!</p>)}/>
    );

    Page.getInitialProps = ({ query }) => {
      // ...
    };
    ```

<br>

### API 라우팅
> Next.js는 브라우저에 페이지로 뜨는 **페이지 라우터** 외에 **API 라우터**도 만들 수 있습니다.

- Next.js에 의해 fetch 요청을 통해 JSON 형태로 저장된 데이터를 프론트엔드에 전송하거나 받을 수 있습니다.
  - API 라우팅은 `/pages/api/` 폴더 아래에 위치하며 `/api` 엔드포인트에 매핑됩니다.
  
  - 이 라우터를 통해 Node.js 코드를 작성할 수 있습니다. 이는 프론트엔드와 백엔드의 매끄러운 전환이 가능하므로 패러다임을 전환할 수 있습니다.

- `/pages/api/comments.js` 파일이 있고, 이 파일은 블로그 게시물의 댓글들을 JSON 형태로 반환한다고 가정해볼까요?
  ```json
  // /pages/api/comments.json
  [
    {
      "comment": "First"
    },
    {
      "comment": "Second"
    }
  ]
  ```
  ```js
  // /pages/api/comments.js
  import comments from './comments.json';

  export default (req, res) => {
    req.status(200).json(comments);
  }
  ```
  - 이 코드는 GET 요청으로 `/api/comments` URL을 listen하게 되며, 브라우저를 통해 API를 호출할 수 있습니다.

<br>

- API 라우터는 동적 API 라우터를 생성하는 `[]` 문법을 이용해 마치 페이지와 같이 동적 라우팅 또한 사용할 수 있습니다.
  ```js
  import comments from './comments.json';

  export default (req, res) => {
    req.status(200).json({ post: req.query.id, comments });
  }
  ```
  - 동적 페이지의 Router를 import하여 사용하는 방식보다 API 라우팅은 request 객체가 컨텍스트에 포함되어 더욱 쉽게 접근할 수 있습니다.
  
  - POST 요청으로 API를 호출해도, 위의 코드는 동일합니다. 모두 default export를 거치거든요.
  
  - HTTP 메소드를 구분하기 위해선 `req.method` 값을 살펴보세요.
  
  - req.cookies, req.body 등을 참조하여 여러 요소에 접근할 수 있습니다.

<br>

- 이 모든 기능은 Next.js 팀에서 만든 `Micro`라는 비동기 HTTP 마이크로서비스에 의해 동작합니다. 따라서 더 많은 기능성을 추가하기 위해 모든 마이크로 미들웨어를 여러분의 API 라우터에 활용할 수 있습니다.

<br>

### 코드를 서버 혹은 클라이언트 측에서 실행하기
- 페이지 컴포넌트의 코드는 window 속성을 확인하여 실행합니다. 이 속성은 브라우저에만 존재하므로 확인이 필요하죠.
  ```js
  if(typeof window === undefined) {
    // ...
  }
  ```
  - undefined를 감지할 수 없어 typeof 연산자로 조건문을 작성했습니다.

<br>

### 지연 로딩 모듈
- 용량이 큰 모듈을 import 하면 어떤 행위마다 클라이언트로부터 이 모든 코드를 가져올 텐데, 매우 비효율적이죠.
  - 더 작은 사이즈의 라이브러리를 찾지 못한다면, 해당 코드를 번들로 분리하는 것입니다.

<br>

- 컴포넌트 단계에서 import하지 않고, getInitialProps() 내에서 비동기로 import한 뒤, 연산 값을 컴포넌트에 보내줍니다.
  - `.default()`라는 특이한 호출은 동적 import 내에서 기본 export를 참조하기 위해 필요합니다.
  
  - [Dynamic Import](https://v8.dev/features/dynamic-import)

<br>

- 이제 번들 용량은 다시 작아지고, 용량이 큰 모듈은 자체 번들로 이동되어 브라우저에 분리된 채로 로드됩니다.

<br>

### 그외
- [getInitialProps vs getServerSideProps](https://develogger.kro.kr/blog/LKHcoding/133)

<br>