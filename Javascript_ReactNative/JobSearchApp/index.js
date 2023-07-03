// expo-router 사용하는 경우  (docs홈피에 나와있음)
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}
