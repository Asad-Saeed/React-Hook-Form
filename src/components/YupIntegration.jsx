// step 1 npm install yup @hookform/resolvers          //@hookform/resolvers it is a bridge to connect both
// we can also used zod
import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// second step import both
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// step3 define yup validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email Formate not valid")
    .required("email is required"),
  password: yup.string().required("password is required"),
});
let renderCount = 0;
const YupIntegration = () => {
  const form = useForm();
  // blow we cannot destructure from form 'coz it is not a function
  const { register, control, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(schema),
  });
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
                {...register("name")}
                placeholder="Enter name"
              />
              <label htmlFor="name">Name</label>
              <span>{errors.name?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                {...register("email")}
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
              <span>{errors.email?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                {...register("password")}
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

export default YupIntegration;
