import path from "path";
import webpack from "webpack";

// plugin
import HtmlWebpackPlugin from "html-webpack-plugin";

const configuration: webpack.Configuration = {
  mode: "development",

  // 모듈 해석 방법 설정
  resolve: {
    // 생략할 확장자
    extensions: [".ts", ".tsx", ".js", ".jsx"],

    // 절대 경로
    alias: {
      "@src": path.resolve(__dirname, "../src/"),
    },
  },

  // 진입점
  entry: "./src/index",

  // 결과물
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
  },

  // 로더
  module: {
    // 로더들 명시할 배열
    rules: [
      // babel-loader
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      // 스타일 관련 로더 ( 우측부터 실행 )
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },

  // 플러그인
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "..", "public", "index.html"),
    }),
  ],
};

export default configuration;