const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: // какие версии браузеров поддерживать
     "defaults",
    // использовать полифилы для браузеров из свойства target
    // по умолчанию babel использует полифилы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };