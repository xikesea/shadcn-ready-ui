import React from "react";
import { MultiStepForm } from "./multi-step-form";

export default function AdvancedFormDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-xl border shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Job Application</h2>
        <p className="text-muted-foreground">Please fill out the form below to apply for the position.</p>
      </div>
      <MultiStepForm />
    </div>
  );
}
