"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface AuthFormProps {
  action: "login" | "signup";
}

export function AuthForm({ action }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const authError = searchParams.get("error");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (action === "signup" && !name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (action === "login") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setErrors({ form: result.error });
        } else {
          router.push("/");
        }
      } else {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
          const data = await response.json();
          setErrors({ form: data.message || "Registration failed" });
          return;
        }

        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        router.push("/");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6 p-1" onSubmit={handleSubmit}>
      {(authError || errors.form) && (
        <div className="px-4 py-3 bg-red-50 text-red-700 rounded-md">
          {authError || errors.form}
        </div>
      )}

      <div className="rounded-md shadow-sm space-y-4 p-1">
        {action === "signup" && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 font-bold">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
              } placeholder-gray-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm mb-1 font-bold">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`appearance-none relative block w-full px-3 py-2 border ${
              errors.email ? "border-red-300" : "border-gray-300"
            } placeholder-gray-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-1 font-bold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`appearance-none relative block w-full px-3 py-2 border ${
              errors.password ? "border-red-300" : "border-gray-300"
            } placeholder-gray-500 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : action === "login" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </form>
  );
}
