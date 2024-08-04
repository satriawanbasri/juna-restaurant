import './index.css'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
)

reportWebVitals()
