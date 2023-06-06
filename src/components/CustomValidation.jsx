import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
const CustomValidation = () => {
  const form = useForm({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      return {
        name: "Asad Saeed",
        email: data.email,
        password: "123456",
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
      };
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const submission = (data) => {
    alert(
      "Form submitted " +
        "Name=" +
        data.name +
        "Email= " +
        data.email +
        "Password= " +
        data.password +
        "Twitter= " +
        data.social.twitter +
        "Face Book= " +
        data.social.facebook
    );
  };

  renderCount++;
  return (
    <div className="container d-flex m-3 justify-content-center">
      <div className="col-5">
        <h2>RHF Render Count= {renderCount / 2}</h2>

        <main className="form-signin  m-auto">
          <form onSubmit={handleSubmit(submission)} noValidate>
            <img
              className="mb-4"
              src="favicon.ico"
              alt=""
              width={72}
              height={72}
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
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
              {/* Custom validation by using validate */}
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
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                {...register("social.twitter", {
                  required: {
                    value: true,
                    message: "Twitter Account is required",
                  },
                })}
                placeholder="Twitter  account"
              />
              <label htmlFor="social.twitter">Twitter</label>
              <span>{errors?.social?.twitter?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                {...register("social.facebook", {
                  required: {
                    value: true,
                    message: "FaceBook Account is required",
                  },
                })}
                placeholder="Twitter  account"
              />
              <label htmlFor="social.facebook">FaceBook</label>
              <span>{errors?.social?.facebook?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                {...register("phoneNumbers.0", {
                  required: {
                    value: true,
                    message: "Primary Phone is required",
                  },
                })}
                placeholder="Primary Phone"
              />
              <label htmlFor="Primary-Phone">Primary Phone</label>
              <span>{errors?.phoneNumbers?.[0]?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                {...register("phoneNumbers.1", {
                  required: {
                    value: true,
                    message: "Secondary Phone is required",
                  },
                })}
                placeholder="Secondary Phone"
              />
              <label htmlFor="Secondary-Phone">Secondary Phone</label>
              <span>{errors?.phoneNumbers?.[1]?.message}</span>
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

export default CustomValidation;
