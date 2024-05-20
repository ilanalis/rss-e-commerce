import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
