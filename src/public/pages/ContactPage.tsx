import React, { useState } from "react";
import { Link } from "@/lib/navigation";
import { PublicLayout } from "@/public/components/PublicLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import {
  MessageSquare,
  Mail,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Send,
  RotateCcw,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Feedback");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate brief client-side processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCategory("Feedback");
    setSubject("");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium mb-6">
          <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
          <span>PROTOTYPE SUPPORT & CREATOR INQUIRIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-6 leading-tight">
          Contact & Community Feedback
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Questions about workflow stages, platform constraints, or architecture decisions? Share
          your thoughts with us.
        </p>
      </section>

      {/* Main Form & Info Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-left flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-200">
              Prototype Notice: No External Mail Server Connected
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              This application is currently running in prototype mode. Inquiries submitted via this
              form are recorded locally within your browser session and will not dispatch an
              external email or support ticket. Please do not submit confidential information.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-6 sm:p-8 border-slate-200/90 dark:border-slate-800 shadow-md">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Prototype Inquiry Recorded
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Thank you for submitting feedback on the Creator Command Center interface. Your
                  message has been captured in your current client evaluation state.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs font-mono space-y-1 max-w-md mx-auto text-slate-600 dark:text-slate-300">
                <div>
                  <strong>Sender:</strong> {name} ({email})
                </div>
                <div>
                  <strong>Category:</strong> {category}
                </div>
                <div>
                  <strong>Subject:</strong> {subject}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Submit Another Note
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="e.g. Eric Dollar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. eric@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Inquiry Topic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Feedback", "Feature Question", "Bug Report", "General Inquiry"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        category === cat
                          ? "border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Subject Line"
                placeholder="What is your message regarding?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <Textarea
                label="Detailed Message"
                placeholder="Describe your workflow questions, UI observations, or feature requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
                  Demonstration form • Submissions saved to local prototype state
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Send Prototype Message
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Quick Resource Help Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/faq"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center gap-3 text-xs"
          >
            <HelpCircle className="w-5 h-5 text-sky-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Read the FAQ
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Common questions regarding platforms and scheduling.
              </span>
            </div>
          </Link>

          <Link
            to="/features"
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center gap-3 text-xs"
          >
            <Mail className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Workflow Documentation
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Understand the 10 sequential content stages.
              </span>
            </div>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};
