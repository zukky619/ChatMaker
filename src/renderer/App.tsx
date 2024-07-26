import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ChatNavigator from './ChatNavigator';
import './App.css';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<ChatNavigator />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
