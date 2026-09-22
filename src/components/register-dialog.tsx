import { useState } from "react";
import { UserPlus } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentTimeHHMM } from "@/lib/utils";

interface RegisterDialogProps {
  courses?: (Course & { isEnrolled?: boolean })[];
  availableCourses?: Course[];
  student: Student;
  onEnroll: (courseId: string, enrollTime: string) => void;
}

export function RegisterDialog({
  courses,
  availableCourses: directAvailableCourses,
  student,
  onEnroll,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [time, setTime] = useState<string>(getCurrentTimeHHMM());

  const coursesToSelect =
    directAvailableCourses ??
    (courses ? courses.filter((c) => !c.isEnrolled) : []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setSelectedCourseId("");
      setTime(getCurrentTimeHHMM());
    }
  };

  const handleConfirm = () => {
    if (!selectedCourseId) return;

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    onEnroll(selectedCourseId, date.toISOString());
    setOpen(false);
  };

  const selectedCourse = coursesToSelect.find(
    (c) => c.courseId === selectedCourseId,
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="gap-2 shrink-0" />}>
        <UserPlus className="h-4 w-4" />
        ลงทะเบียน
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          <div className="grid gap-2">
            <Label htmlFor="course">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={(val) => setSelectedCourseId(val ?? "")}
            >
              <SelectTrigger id="course" className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
                {selectedCourse
                  ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                  : undefined}
              </SelectTrigger>
              <SelectContent>
                {coursesToSelect.map((c) => (
                  <SelectItem key={c.courseId} value={c.courseId}>
                    {c.courseId} - {c.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="student-name">ชื่อ นศ.</Label>
            <Input
              id="student-name"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              value={student.program}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedCourseId}
            className="w-full sm:w-auto"
          >
            ยืนยันการลงทะเบียน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
