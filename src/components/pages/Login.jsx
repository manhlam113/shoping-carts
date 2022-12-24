import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { get, onValue, ref } from "firebase/database";
import { database } from "../../firebase";

const Login = () => {
  const { lsUsers, user, errLogin } = useSelector((state) => state.stateUser);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const dbRef = ref(database);

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      console.log("snapshotLogin", snapshot.val());
      dispatch({
        type: "GET_USERS",
        payload: snapshot.val().users,
      });
    });
    // get(ref(database, `users`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //       dispatch({
    //         type: "GET_USERS",
    //         payload: snapshot.val(),
    //       });
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);
  console.log("UserStateLsUser", lsUsers);

  function handleSignIn(email, password) {
    if (lsUsers.length > 0) {
      lsUsers.forEach((item) => {
        if (item.email == email && item.password == password) {
          dispatch({
            type: "SET_USER",
            payload: {
              email: item.email,
              password: item.password,
              userId: item.userId,
              history: item.history,
            },
          });

          // onValue(dbRef, (snapshot) => {
          //   console.log("snapshot", snapshot.val().users[user.userId]);
          //   dispatch({
          //     type: "GET_CARTS",
          //     payload: snapshot.val().users[user.userId].carts.items,
          //   });
          // });

          navigator("/products/1");
        } else {
          dispatch({ type: "ERROR_LOGIN", payload: true });
        }
      });
    }
  }
  console.log("UserGot", user);
  return (
    <>
      <Formik
        initialValues={{ password: "", email: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Password is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSignIn(values.email, values.password);
          resetForm();
        }}
      >
        <Form className="max-w-[500px] mx-auto bg-white rounded-md mt-10 p-4">
          <h1 className="text-center font-semibold text-2xl">Login</h1>
          {errLogin ? (
            <div className="text-[#d8507b] bg-[#f8d7da] text-center p-1 mt-4 mb-4">
              Email is not valid or password not match !
            </div>
          ) : (
            ""
          )}
          {/* {currentUser && currentUser.email} */}
          <div className="form-group mb-4">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full outline-none border border-gray-300 rounded-md p-2"
            />
            <span className="text-red-500">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="w-full outline-none border border-gray-300 rounded-md p-2"
            />
            <span className="text-red-500">
              <ErrorMessage name="password" />
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary rounded-md p-2 text-white mt-4"
          >
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
