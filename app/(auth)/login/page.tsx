import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center p-1 sm:p-28 justify-items-center w-full">
      <div className="max-w-md w-full space-y-8 p-2 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/signup"
              className="font-medium text-green-600 hover:text-green-500">
              create a new account
            </a>
          </p>
        </div>
        <AuthForm action="login" />
      </div>
    </div>
  );
}
