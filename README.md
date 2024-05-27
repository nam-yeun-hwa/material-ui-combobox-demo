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
(추가 예정....)

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
