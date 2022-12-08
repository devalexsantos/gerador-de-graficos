import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import BarGraph from "./components/Graphics/BarGraph"
import { LineGraph } from "./components/Graphics/LineGraph"
import Home from "./pages/Home"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/grafico-de-linha" element={<LineGraph />} />
          <Route path="/grafico-de-barra" element={<BarGraph />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
