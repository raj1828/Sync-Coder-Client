import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'
import EditorPage from './pages/EditorPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
       return (
              <>
                     <div >
                            <Toaster position='top-right' toastOptions={{
                                   success: {
                                          theme: {
                                                 primary: '#4aed88',
                                          },
                                   },
                            }} />
                     </div>
                     <BrowserRouter>
                            <Routes>
                                   <Route path="/" element={<Home />} />
                                   <Route path="/editor/:roomId" element={<EditorPage />} />

                            </Routes>
                     </BrowserRouter>
              </>
       );
}

export default App;
