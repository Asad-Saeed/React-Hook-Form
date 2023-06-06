import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
const Form1 = () => {
  const form = useForm();
  // To help manage form state react hook form provide a method called register
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState; // error object contain individual field errors
  // register method return 4 method
  // After that by using these things behind the seen
  // name = { name };
  // ref = { ref };
  // onChange = { onChange };
  // onBlur = { onBlur };
  // in input field now react hook form automatically keep track of input fields
  // const { name, ref, onChange, onBlur } = register("name");
  // But easily You can use spread operator ...register("email")
  // control is used to associate DevTool by specifing control prop
  // From Submission 3 steps 1st crate method, 2nd destructure a function handelsubmit from RHF, 3rd optional show data
  // formState use to show error and validation messages to users
  const submission = (data) => {
    alert(
      "Form submitted " +
        "Name=" +
        data.name +
        "Email= " +
        data.email +
        "Password= " +
        data.password
    );
  };

  renderCount++;
  return (
    <div className="container d-flex m-3 justify-content-center">
      <div className="col-5">
        <h2>RHF Render Count= {renderCount / 2}</h2>
        {/* devided by 2 'coz during development react strict mode render component twice */}
        <main className="form-signin  m-auto">
          <form onSubmit={handleSubmit(submission)} noValidate>
            {/* noValidate prevent browser validation and allow RFH validation */}
            <img
              className="mb-4"
              src="favicon.ico"
              alt=""
              width={72}
              height={72}
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              {/* here we are using HTML Required validation */}
              <input
                type="text"
                className="form-control"
                {...register("name", {
                  required: { value: true, message: "Username is required" },
                })}
                placeholder="Enter name"
              />
              <label htmlFor="name">Name</label>
              <span>{errors.name?.message}</span>
            </div>
            <div className="form-floating">
              {/* here we are using HTML pattern validation */}
              <input
                type="email"
                className="form-control"
                {...register("email", {
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email",
                  },
                  validate: {
                    notAdmin: (fieldValue) => {
                      return (
                        fieldValue !== "admin@gmail.com" ||
                        "Enter a different email address"
                      );
                    },
                    notBlackListed: (fieldValue) => {
                      return (
                        !fieldValue.endsWith("baddomain.com") ||
                        "This domain not supported"
                      );
                    },
                  },
                })}
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
              <span>{errors.email?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
              <span>{errors.password?.message}</span>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">©Asad Saeed</p>
          </form>
          <DevTool control={control} />
        </main>
      </div>
    </div>
  );
};

export default Form1;
