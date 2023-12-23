import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';

export default function ClosedAccess() {
  return (
    <>
      <div className="parent">
        <div className="block">
          <p>Доступ закрыт!</p>
          <p className="p-class">Используйте наше мобильное приложение</p>
          </div>
      </div>
    </>
  );
}
