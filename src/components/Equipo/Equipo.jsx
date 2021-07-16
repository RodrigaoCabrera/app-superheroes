import React, { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";
import Login from "../Login/Login"

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
      <Login />
      <Hero />
    </Suspense>
  );
};
