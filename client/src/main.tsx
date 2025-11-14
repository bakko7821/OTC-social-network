import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.scss'
import App from './components/App'
import { applyTheme } from './utils/theme'

const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
applyTheme(savedTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
