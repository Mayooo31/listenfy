import React from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../../context/context";
import { Helmet } from "react-helmet";

import styles from "../../styles";

import loginHandler from "../../utils/loginHandler";

const Error = () => {
  const navigate = useNavigate();
  const { error } = useCtx();

  return (
    <div className={`${styles.section} justify-center items-center gap-5`}>
      <Helmet>
        <title>
          Listenfy - Error {error?.status ? error.status : ": Something happend"}
        </title>
      </Helmet>
      <div className="flex gap-3 text-3xl">
        <h1 className="text-red-500">{error?.status}</h1>
        <p className="font-medium">{error?.message ? error.message : error}</p>
      </div>
      <button onClick={loginHandler} className={`${styles.button} text-3xl`}>
        Try to relog
      </button>
    </div>
  );
};

export default Error;
