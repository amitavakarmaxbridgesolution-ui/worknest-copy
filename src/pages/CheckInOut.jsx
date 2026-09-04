import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import StatusBadge from "@/components/StatusBadge";

export default function CheckInOut() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  const load = async () => {
    setLoading(true);
    try {
      const all = await base44.entities.Attendance.list("-created_date", 500);
      const t = all.find((a) => a.employee_email === user?.email && a.date === new Date().toISOString().slice(0, 10));
      setToday(t || null);
    } catch (e) { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => {
    load();
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPosition = () =>
    new Promise((res) => {
      if (!navigator.geolocation) return res({ lat: null, lon: null });
      navigator.geolocation.getCurrentPosition(
        (p) => res({ lat: p.coords.latitude.toFixed(4), lon: p.coords.longitude.toFixed(4) }),
        () => res({ lat: null, lon: null }),
        { timeout: 5000 }
      );
    });

  const checkIn = async () => {
    const { lat, lon } = await getPosition();
    try {
      const rec = await base44.entities.Attendance.create({
        employee_email: user.email,
        date: new Date().toISOString().slice(0, 10),
        check_in: new Date().toISOString(),
        status: "present",
        latitude: lat, longitude: lon,
      });
      setToday(rec);
      toast({ title: "Checked in", description: lat ? `Location captured` : "Location unavailable" });
    } catch (e) {
      toast({ title: "Check-in failed", description: e.message, variant: "destructive" });
    }
  };

  const checkOut = async () => {
    if (!today) return;
    try {
      const updated = await base44.entities.Attendance.update(today.id, { check_out: new Date().toISOString() });
      setToday(updated);
      toast({ title: "Checked out" });
    } catch (e) {
      toast({ title: "Check-out failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <PageHeader title="Check In / Out" description="Real-time attendance clocking" />
      <Card className="p-8 max-w-md mx-auto text-center">
        <Clock className="h-10 w-10 mx-auto text-primary mb-3" />
        <p className="text-4xl font-semibold tracking-tight tabular-nums">
          {now.toLocaleTimeString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{now.toDateString()}</p>
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> Geolocation captured where browser permits
        </div>
        {today ? (
          <div className="mt-5">
            <div className="text-sm mb-3">
              Checked in at {new Date(today.check_in).toLocaleTimeString()}{" "}
              <StatusBadge status={today.check_out ? "inactive" : "active"} /> {today.check_out ? "(checked out)" : "(working)"}
            </div>
            {!today.check_out && (
              <Button onClick={checkOut} variant="destructive"><LogOut className="h-4 w-4 mr-1" /> Check Out</Button>
            )}
          </div>
        ) : (
          <Button onClick={checkIn} className="mt-5"><LogIn className="h-4 w-4 mr-1" /> Check In</Button>
        )}
      </Card>
    </div>
  );
}