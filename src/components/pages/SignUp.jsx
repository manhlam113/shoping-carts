import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
// import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";
import { onValue, ref, set } from "firebase/database";

const SignUp = () => {
  const { lsUsers } = useSelector((state) => state.stateUser);
  const [exitEmail, setExitEmail] = useState(false);
  const dbRef = ref(database);

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      console.log("snapshotAtSignUp", snapshot.val());
      dispatch({
        type: "GET_USERS",
        payload: snapshot.val().users,
      });
    });
  }, []);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  function checkEmailExit(lsUsers, email) {
    // console.log("lsUsers", lsUsers);
    // console.log("Email", email);
    for (let i = 0; i <= lsUsers.length; i++) {
      if (lsUsers[i]?.email === email) {
        return true;
      }
    }
    return false;
  }
  const handleSignUp = (email, password) => {
    //Bước 1 kiểm tra email có tồn tại hay ko
    //Bước 2 nếu email tồn tại báo lỗi email tồn tại
    //Bước 3 nếu ko tồn tại thì set user lên firebase bao gồm  và SET USER đó lên redux luôn
    /*
     *
        carts,email,password,userId,history
     */

    if (checkEmailExit(lsUsers, email) === true) {
      setExitEmail(true);
    } else {
      const userInfo = {
        carts: {
          items: {
            0: [""],
          },
        },
        email: email,
        history: {
          0: [""],
        },
        password: password,
        userId: lsUsers.length,
      };
      set(ref(database, `users/${lsUsers.length}`), userInfo);
      dispatch({
        type: "SET_USER",
        payload: userInfo,
      });
      navigator("/home");
    }
  };

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
        onSubmit={(values, { setSubmitting }) => {
          handleSignUp(values.email, values.password);
        }}
      >
        <Form className="max-w-[500px] mx-auto bg-white rounded-md mt-10 p-4">
          <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
          {exitEmail ? (
            <div className="text-[#d8507b] bg-[#f8d7da] text-center p-1 mt-4 mb-4">
              Email is exit!
            </div>
          ) : (
            ""
          )}
          {/* {currentUser && currentUser.email} */}

          <div className="form-group mb-2">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="text"
              className="w-full outline-none border border-gray-300 rounded-md  p-2  hover:border-blue-500"
            />
            <span className="text-red-500">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className="w-full outline-none border border-gray-300 rounded-md p-2  hover:border-blue-500"
            />
            <span className="text-red-500">
              <ErrorMessage name="password" />
            </span>
          </div>
          <div className="flex gap-x-2 justify-center">
            <button
              className="bg-pink-500 rounded-md p-1 text-white"
              onClick={() => navigator("/login")}
            >
              You have an account ?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 rounded-md p-2 text-white mt-4"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default SignUp;
