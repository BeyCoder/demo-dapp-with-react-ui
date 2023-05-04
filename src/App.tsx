import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;
function App() {

  return (
      <TonConnectUIProvider
          manifestUrl="https://play.fck.foundation/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
      >
        <div className="app">
            <Header />
            <TxForm />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
