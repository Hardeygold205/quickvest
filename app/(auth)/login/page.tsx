import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-md w-full space-y-8 rounded-lg shadow-md">
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
