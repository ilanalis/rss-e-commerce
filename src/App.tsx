import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import Header from '@components/header/';

function App() {
  return (
    <>
      <Header isAuth={true} theme="dark" />
    </>
  );
}

export default App;
