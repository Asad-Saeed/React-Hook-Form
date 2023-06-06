import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
const AsyncValidation = () => {
  const form = useForm();
  //   mode: "onChange";
  const { register, control, handleSubmit, formState, trigger } = form; //trigger is used for Manually Trigger Validations
  const { errors } = formState;

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
                    emailAvailable: async (fieldValue) => {
                      //Async validation
                      const res = await fetch(
                        `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                      );
                      const data = await res.json();
                      return data.length == 0 || "Email Already Exist";
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
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={() => trigger()} //for single field trigger("name")
            >
              Trigger
            </button>
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

export default AsyncValidation;
