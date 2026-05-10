"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { formSchema, type FormValues } from "./schema";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Professional" },
  { id: 3, title: "Confirmation" },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "",
      experience: "",
      portfolio: "",
      notifications: false,
      terms: false,
    },
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fields as any);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    setIsSubmitted(true);
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ["fullName", "email", "phone"];
      case 2:
        return ["role", "experience", "portfolio"];
      case 3:
        return ["terms"];
      default:
        return [];
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 space-y-4"
      >
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">Application Submitted!</h2>
        <p className="text-muted-foreground">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Apply for another role
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`text-xs font-medium uppercase tracking-wider ${
                currentStep >= step.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "33.33%" }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="0123456789"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Desired Role</Label>
                  <Select onValueChange={(val: string | null) => val && setValue("role", val)}>
                    <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Developer</SelectItem>
                      <SelectItem value="backend">Backend Developer</SelectItem>
                      <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                      <SelectItem value="designer">UI/UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-xs text-destructive">{errors.role.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select onValueChange={(val: string | null) => val && setValue("experience", val)}>
                    <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-xs text-destructive">{errors.experience.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    {...register("portfolio")}
                    className={errors.portfolio ? "border-destructive" : ""}
                  />
                  {errors.portfolio && (
                    <p className="text-xs text-destructive">{errors.portfolio.message}</p>
                  )}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    onCheckedChange={(val: boolean) => setValue("notifications", val)}
                  />
                  <Label htmlFor="notifications">Receive email updates about your application</Label>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(val: boolean) => setValue("terms", val)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                      <p className="text-xs text-muted-foreground">
                        By clicking this, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-destructive">{errors.terms.message}</p>
                  )}
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <h4 className="font-semibold">Summary</h4>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{watch("fullName")}</span>
                    <span className="text-muted-foreground">Role:</span>
                    <span>{watch("role")}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep}>
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={!isValid}>
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
