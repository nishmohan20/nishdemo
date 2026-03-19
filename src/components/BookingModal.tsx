import { useState } from "react";
import { CalendarDays, Clock, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Instructor } from "@/data/instructors";

interface BookingModalProps {
  instructor: Instructor | null;
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

const days = [
  { label: "Mon", date: "Mar 24" },
  { label: "Tue", date: "Mar 25" },
  { label: "Wed", date: "Mar 26" },
  { label: "Thu", date: "Mar 27" },
  { label: "Fri", date: "Mar 28" },
];

type Step = "select" | "confirm" | "done";

const BookingModal = ({ instructor, open, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("select");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!instructor) return null;

  const rate = instructor.discountRate ?? instructor.hourlyRate;

  const handleClose = () => {
    setStep("select");
    setSelectedDay(null);
    setSelectedTime(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border p-4">
          {step !== "select" && step !== "done" && (
            <button onClick={() => setStep("select")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <img src={instructor.photo} alt={instructor.name} className="h-10 w-10 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-card-foreground truncate">{instructor.name}</p>
            <p className="text-xs text-muted-foreground">${rate}/hr session</p>
          </div>
          {instructor.satisfactionGuarantee && (
            <span className="inline-flex items-center gap-1 rounded-full bg-guarantee/10 px-2 py-1 text-xs font-medium text-guarantee">
              <ShieldCheck className="h-3 w-3" />
              Guaranteed
            </span>
          )}
        </div>

        {/* Step: Select */}
        {step === "select" && (
          <div className="p-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> Pick a Day
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {days.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDay(d.date)}
                    className={`rounded-lg border p-2 text-center transition-all ${
                      selectedDay === d.date
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="block text-xs font-bold">{d.label}</span>
                    <span className="block text-xs text-muted-foreground">{d.date.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Pick a Time
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition-all ${
                      selectedTime === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedDay || !selectedTime}
              onClick={() => setStep("confirm")}
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue to Review
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && (
          <div className="p-5 space-y-5">
            <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
              <h3 className="text-sm font-bold text-card-foreground">Booking Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium text-card-foreground">{instructor.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-card-foreground">{selectedDay}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-card-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-card-foreground">1 hour</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="font-bold text-card-foreground">Total</span>
                <div className="text-right">
                  {instructor.discountRate && (
                    <span className="text-xs text-muted-foreground line-through mr-2">${instructor.hourlyRate}</span>
                  )}
                  <span className="font-bold text-primary">${rate}</span>
                </div>
              </div>
            </div>

            {instructor.satisfactionGuarantee && (
              <div className="flex items-start gap-2 rounded-lg bg-guarantee/10 border border-guarantee/20 p-3">
                <ShieldCheck className="h-4 w-4 text-guarantee mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-guarantee">100% Satisfaction Guarantee</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Not happy with your session? Get a full refund, no questions asked.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep("done")}
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:opacity-90"
            >
              Confirm Booking — ${rate}
            </button>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-guarantee/10">
              <CheckCircle2 className="h-8 w-8 text-guarantee" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your session with {instructor.name} is booked for {selectedDay} at {selectedTime}.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              You&apos;ll receive a confirmation email with session details and a link to join.
            </p>
            <button
              onClick={handleClose}
              className="w-full rounded-lg bg-secondary py-3 text-sm font-bold text-secondary-foreground transition-colors hover:opacity-90"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
