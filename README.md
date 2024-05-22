# Combobox with material-ui
material-ui중 combobox를 데모 버전으로 만들어 보도록 한다. 

1. 프론트엔드로만 구성
2. combobox의 기존 디자인과 기능을 바탕으로 구성하며 계속적으로 조금씩 기능을 업데이트할 예정이다.
3. TDD를 적용
4. 점진적인 리팩토링

참고 링크 : https://mui.com/material-ui/react-autocomplete/#combo-box


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
