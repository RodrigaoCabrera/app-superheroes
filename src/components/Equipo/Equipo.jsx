import React, { lazy, Suspense, useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import SearchBar from "../Buscador/SearchBar";
import SearchHeros from "../Buscador/SearchHeros";

import { HerosProvider, useHeros } from "../Context/HerosContext";

const Hero = lazy(() => import("./Hero/Hero"));
export default () => (
  <HerosProvider>
    <Equipo />
  </HerosProvider>
);

const Equipo = () => {
  const { isViewSearch } = useHeros();

  return isViewSearch ? (
    <SearchHeros />
  ) : (
    <Suspense fallback={<Loading />}>
      <SearchBar />
      <Hero />
    </Suspense>
  );
};
