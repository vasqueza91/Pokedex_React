import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './containers/Pokedex';
import NavBar from './components/NavBar';
import PokemonDetails from './containers/PokemonDetails';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Favorites from "./containers/Favorites";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            {/* <Route path="/favorites" element={<Favorites />} /> */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
