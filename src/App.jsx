import {Route, Routes} from "react-router";
import './App.css'
import MusicList from "./pages/components/musicList/index.jsx";
import MusicCreate from "./pages/components/musicCreate/index.jsx";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/musics"} element={<MusicList/>}></Route>
            <Route path="/musics/create" element={<MusicCreate/>} />
        </Routes>
    </>
  )
}

export default App
