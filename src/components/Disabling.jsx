import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
let renderCount = 0;
const Disabling = () => {
  const form = useForm({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      return {
        name: "",
        email: "",
        password: "",
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        age: 0,
        dob: new Date(),
      };
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset, //used for reseting form after submittion or initial values cleared, not use in onSubmit call by useEffect
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  console.log({
    touchedFields,
    dirtyFields,
    isDirty,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  }); //isDirty is better instead of both other 2
  // reacthookform Provide a watch method by which we can observe one or more form field values
  // getValues is better option it will not rerendered
  // isValid is used to disable submit button until valid
  // isSubmitting used to keep track is in the processes to beaing submitted, return boolean false bydefult
  // isSubmitted used to keep track form is submitted, return boolean false bydefult and true on submit remain true untile form rest
  //  isSubmitSuccessful is used to check form submission successful during run time and return true
  //   submitCount;  is used to check how many time form submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
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
  const onError = (errors) => {
    console.log("errors=", errors);
  };
  const handleGetValues = () => {
    const formValues = getValues("social"); //we can get single values also
    console.log("Form values:", formValues);
  };
  const handleSetValues = () => {
    const formValues = setValue("name", "Saeed", {
      shouldValidate: true,
      shouldDirty: true,
      shouldDirty: true,
    }); //we can get single values also
    console.log("Form values:", formValues);
  };

  // we use watch method with a field name and pass to variable then we can render this value to UI  watch("name")
  // it also accept array of field values watch(["name", "email"])
  //   single watch to show all field values
  const watchUserName = watch(["name", "email"]);
  useEffect(() => {
    const subscribe = watch((value) => {
      console.log("Value", value);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  renderCount++;

  return (
    <div className="container d-flex m-3 justify-content-center">
      <div className="col-5">
        <h2>RHF Render Count= {renderCount / 2}</h2>
        <h2>Watched Value ={watchUserName}</h2>
        <main className="form-signin  m-auto">
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            {/* onErrorHandler second argument of handle Submit */}
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
                // disabled //traditional ways
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
                  //   disabled: true, //by RFH disable value of field undefined and validation also disabled
                  //   conditional disabled
                  disabled: watch("email") === "",
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
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                {...register("age", {
                  valueAsNumber: true, //this is used for age or number value
                  required: "age is required",
                })}
                placeholder="Age"
              />
              <label htmlFor="age">Age</label>
              <span>{errors.age?.message}</span>
            </div>
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                {...register("dob", {
                  valueAsDate: true, //this is used for dob value
                  required: {
                    value: true,
                    message: "Date of birth is required",
                  },
                })}
                placeholder="Date of birth"
              />
              <label htmlFor="dob">Date of birth</label>
              <span>{errors.dob?.message}</span>
            </div>
            {/* Disable button if input fields is not dirty mean user not interact attribute disabled={!isDirty} */}
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              className="w-100 btn btn-lg btn-primary"
              type="submit"
            >
              Sign in
            </button>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={handleGetValues}
            >
              Get values
            </button>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={handleSetValues}
            >
              Set values
            </button>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={() => reset()}
            >
              ReSet
            </button>
            <p className="mt-5 mb-3 text-muted">©Asad Saeed</p>
          </form>
          <DevTool control={control} />
        </main>
      </div>
    </div>
  );
};

export default Disabling;
