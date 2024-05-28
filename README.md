# Combobox with material-ui
material-ui중 combobox를 데모 버전으로 만들어 보도록 한다. 

1. 프론트엔드로만 구성
2. combobox의 기존 디자인과 기능을 바탕으로 구성하며 계속적으로 조금씩 기능을 업데이트할 예정이다.
3. TDD를 적용
4. 점진적인 리팩토링

컨셉 링크 : https://mui.com/material-ui/react-autocomplete/#combo-box


# DEMO version 0.0.1


<img src="https://nyhya.cafe24.com/git_img/combo-component-Demo.gif" width="400" height="auto"/>
    
- Select바를 클릭하여 input 입력을 통해 option 값을 검색할 수 있습니다.
- option 을 선택하지 않고, focus 가 Select를 벗어난 경우에는, 검색어가 삭제됩니다.
- Select를 클릭하거나 Select바에 포커스가 있는 경우에 Select에서 위 방향 또는 아래 방향 키보드를 누르면 선택 가능한 option들이 나타납니다.
- 클릭하거나 엔터키를 통해 option값을 선택할 수 있습니다.
- 선택 가능한 option 들이 나타날 때, 선택된 option이 있다면, 선택된 그 option은 배경색으로 강조 되어 있습니다.
- Select가 hover되는 경우와 focus 되는 경우, 그리고 두 경우가 아닌 경우에 대해 Select 의 스타일이 다릅니다.
- 키보드를 이용해 option을 순회할 때 선택된 option이 시작 지점이 옵션리스트 중 상단으로 지정되어 있습니다.
- Select에 검색어를 사용할 경우 검색어 삭제 버튼이 보이며 검색어 삭제버튼을 누르면 검색어가 삭제됩니다. 
- 선택 가능한 option들이 나타날 때, option들이 스크린을 벗어나지 않도록 Select 아래쪽에 선택 가능한 option 들이 나타나기에 최소 공간(min-height : 370px)이 부족하다면, 선택 가능한 option들은 위쪽에 나타나도록 합니다.(추후 업데이트 예정)
- 키보드 상하 키로 옵션 리스트들의 아이템을 검색할때 스크롤도 함께 이동되어 옵션 리스트들을 볼수 있도록 시야를 확보하도록 합니다.(추후 업데이트 예정)


# 기술 스택
- react.js 18.2.0
- typescript
- @testing-library/react
- jest


# 폴더구조

<pre>
├── public
└── src
     └── components --- 공통컴포넌트 
            ├── constant 
            ├── fetch 
            ├── hook 
            ├── json 
            └── type 
</pre>



# Troubleshooting


## 이슈 1

처음 테스트 라이브러리를 리액트에서 세팅 하는 과정에서 이슈가 발생했다. </br>
TEST 라이브러리에서 import 구문을 읽지 못하여 TEST가 진행되지 못하고 에러를 일으킨것 같다..</br>

```js
 ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.
                           ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      4 | import {useEffect} from "react";
      5 |
    > 6 | import axios from "axios";
        | ^
      7 |
      8 | function App() {
      9 |
```

### 에러가 일어난 원인 추측
- Jest는 Node.js 환경에서 동작하기 때문에 CommonJS 방식으로 모듈을 사용합니다.
- Jest는 바벨 같은 트랜스파일러를 통해 ECMAScript 모듈을 CommponJS 문법에 맞도록 변경 후 사용해야 합니다.
(Jest는 node_modules 폴더는 기본적으로 변경 대상에서 제외합니다.)

### 시도한 내용
우선 node를 type 적용으로 재설치를 하거나 바벨을 설치해 보았으나 문제가 해결되지 않고 다른 에러가 발생 하였다. </br>
마지막으로 동작을 했었던 키워드는jest.config.js에서 `testEnvironment: "node"`를 `testEnvironment: "jsdom"` 으로 변경 한후에 에러가 사라졌다.

📄 jest.config.js

```js
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // TypeScript 파일을 테스트하기 위해 ts-jest 프리셋 사용
  testEnvironment: "jsdom", // 테스트 환경을 jsdom으로 설정 (브라우저 환경 모방)
  // testEnvironment: "node", // 주석 처리된 옵션: 테스트 환경을 Node.js로 설정 (서버 환경 모방)
  verbose: true, // 테스트 실행 결과를 상세히 출력
  // collectCoverage: true, // 주석 처리된 옵션: 테스트 커버리지 수집

  // 특정 경로의 테스트 파일을 제외
  testPathIgnorePatterns: ["<rootDir>/cypress/"], // cypress 디렉토리의 테스트 파일 무시
  transformIgnorePatterns: ["<rootDir>/node_modules/"], // node_modules 디렉토리의 파일을 변환하지 않음

  // 절대 경로 설정
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // @/ 경로를 프로젝트 루트로 매핑
    "^utils/(.*)": "<rootDir>/src/utils/$1", // utils/ 경로를 src/utils로 매핑
    "\\.(css|less)$": "<rootDir>/tests/styleMock.ts", // CSS, Less 파일을 스타일 목(mock) 파일로 매핑
  },
  setupFilesAfterEnv: ["./setupTests.ts"], // 테스트 환경 설정 파일 지정
};

export default config;
```



## 이슈 2

테스트 라이브 러리에서 CSS를 인식하지 못하는 문제가 발생 하였다.

루트에 tests라는 폴더를 만든 후 `styleMock.ts`를 만들어 export default {}; 내용을 넣어주었고
아래의 jest.config.js의 `moduleNameMapper`에서  ` "\\.(css|less)$": "<rootDir>/tests/styleMock.ts" `의 내용을 추가 해주었다.

📄 jest.config.js

```js
moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/styleMock.ts", // CSS, Less 파일을 스타일 목(mock) 파일로 매핑
  },
```

## 그외 참고 

루트에 setupTests.ts 파일을 생성하여 아래 내용을 추가 해주었다.

📄 setupTests.ts
```js
import "@testing-library/jest-dom";
```

`setupTests.ts`를 `jest.config.js`에서 잡아주었다.

📄 jest.config.js
```js
 setupFilesAfterEnv: ["./setupTests.ts"],
```

## 그외 ref [기록용]

리액트에서 ref 객체를 사용하면 DOM 요소에 접근할 수 있고 current 속성을 통해 해당 DOM 요소를 참조할 수 있다. 옵션 아이템을 클릭했다가 다시 옵션을 화면에 보여 줘야 할때 스크롤의 조정이 필요해서 ref를 사용하여 스크롤의 위치를 조정해 주었다.
```ref
const optionRect = optionRefs.current[idx]!.offsetTop;
```
offsetTop 속성은 HTML 요소의 상대적인 위치를 반환하며, 요소의 Top이 부모 컨테이너의 상단에서 얼마나 떨어져 있는지를 나타낸다. 이 속성은 요소의 현재 레이아웃 위치를 가져오는 데 유용하다. (offsetTop은 읽기 전용 속성이다.)

위 코드에서 느낌표(!)는 TypeScript에서 사용하는 non-null assertion operator으로 이 연산자는 개발자가 해당 값이 null이나 undefined가 아님을 컴파일러에게 보증할 때 사용한다. 
즉, !를 사용 하면 TypeScript는 해당 값이 null이나 undefined가 아닌 것으로 간주하고, 그에 따른 타입 체크를 수행하지 않는다.

위 코드에서 optionRefs.current[filteredIndex]는 타입스크립트 컴파일러에게 optionRefs.current 배열의 filteredIndex 위치에 있는 요소가 null이나 undefined가 아님을 보증하는 것이다. 따라서 그 다음에 .offsetTop을 안전하게 접근할 수 있다.

## 그외 ref 참고코드 [기록용]

```ref
import { createRef, useEffect, useState } = from "react";
import "./styles.css";

const buttonWidth = 56;
const tabWidth = 300;
const tabs =
            [
              {
                title:"Home",
                icon:"home",
                content:"Some information inside ..."
              },
            //more tabs
            ]


const WidgetTab = ({tabRef, title, content}) => {
    return (
        <div ref={tabRef}>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
};

export const Widget = () => {
    const [refs, setRefs] = useState([]);

    useEffect(()=>{
        setRefs(tabs.map(()=> createRef()));
    },[]);

    return (
        <>
            {tabs.map.((tab, index) => {
                    <WidgetTab
                        key={tab.title}
                        tabRef={refs[index]}
                        title={tab.title}
                        content={tab.content}
                    />
                }
            )}
        </>
    )
}
```


</br>
</br>
</br>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
