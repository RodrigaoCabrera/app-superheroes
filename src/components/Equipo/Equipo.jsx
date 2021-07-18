import React, { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import Header from "../Header/Header";

import SearchHeros from "../Buscador/SearchHeros";

import { HerosProvider, useHeros } from "../Context/HerosContext";

const Hero = lazy(() => import("./Hero/Hero"));
export default () => (
  <HerosProvider>
    <Equipo />
  </HerosProvider>
);

const Equipo = () => {
  const { isViewSearch, isLogin } = useHeros();

  return isViewSearch ? (
    <SearchHeros />
  ) : isLogin ? 
  (
    <Suspense fallback={<Loading />}>
      <Header />
      <Hero />
    </Suspense>
  ) 
  :
  (
    <Login />
  )
};
