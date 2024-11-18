"use client";

import { useFormik } from "formik";
import ErrorMessage from "./ErrorMessage";
import { SubmitButton } from "./SubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Form({ isLoginForm = true }) {
  const { authAction } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: (values) => {
      const apiURL = isLoginForm ? "/api/login" : "/api/register";

      const promise = new Promise(async (resolve, reject) => {
        authAction(formik, apiURL, values, resolve, reject);
      });

      toast.promise(promise, {
        loading: isLoginForm ? "Signing in..." : "Signing up...",
        success: (data) => data.message || "Success!",
        error: (error) => error.message || "An error occurred.",
      });
    },
  });
  return (
    <div
      className="max-w-md w-full flex flex-col items-center justify-center border rounded-lg p-8 drop-shadow-xl"
      data-testid="login-page"
    >
      <h1 className="text-large-semi font-bold uppercase mb-6">
        {isLoginForm ? "Welcome back" : "Become a Car Store Member"}
      </h1>
      <p className="text-center text-base-regular font-bold text-ui-fg-base mb-8">
        {isLoginForm
          ? "Sign in to access an enhanced shopping experience."
          : "Create your Car Store Member profile, and get access to an enhanced shopping experience."}
      </p>
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        {isLoginForm ? (
          <div className="flex flex-col w-full gap-y-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage error={formik.errors.email} />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage error={formik.errors.password} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-y-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Name"
                name="name"
                type="text"
                title="Enter a full name."
                autoComplete="email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage error={formik.errors.name} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage error={formik.errors.email} />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage error={formik.errors.password} />
            </div>
          </div>
        )}
        <SubmitButton loading={formik.isSubmitting} className="w-full mt-6">
          {formik.isSubmitting && (
            <>
              <ReloadIcon className="animate-spin" />{" "}
              <p>{formik.isSubmitting && "Loading..."}</p>
            </>
          )}
          {!formik.isSubmitting && <>{isLoginForm ? "Sign in" : "Sign up"}</>}
        </SubmitButton>
      </form>
      {isLoginForm ? (
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Not a member?{" "}
          <Link
            href={"/register"}
            className="underline"
            data-testid="register-button"
          >
            Join us
          </Link>
          .
        </span>
      ) : (
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Already a member?{" "}
          <Link href={"/login"} className="underline">
            Sign in
          </Link>
          .
        </span>
      )}
    </div>
  );
}
