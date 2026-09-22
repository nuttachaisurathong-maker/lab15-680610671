import { useState } from "react";
import { UserPlus } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  const allCoursesList = courses ?? [];
  const selectedCourse =
    allCoursesList.find((c) => c.courseId === selectedCourseId) ??
    coursesToSelect.find((c) => c.courseId === selectedCourseId);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="gap-2 shrink-0" />}>
        <UserPlus className="h-4 w-4" />
        ลงทะเบียน
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px]">
        {/* หัวข้อและคำอธิบายตามภาพตัวอย่าง */}
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-lg font-bold">
            ลงทะเบียนเรียน
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* 1. วิชา */}
          <div className="grid gap-2">
            <Label htmlFor="course">วิชา</Label>
            <Select
              value={selectedCourseId}
              onValueChange={(val) => setSelectedCourseId(val ?? "")}
            >
              <SelectTrigger
                id="course"
                className="w-full min-w-0 overflow-hidden"
              >
                {selectedCourse ? (
                  <span className="truncate">
                    {selectedCourse.courseId} - {selectedCourse.courseTitle}
                  </span>
                ) : (
                  <SelectValue placeholder="เลือกวิชา" />
                )}
              </SelectTrigger>

              {/* กว้างเท่ากับ Trigger และรองรับการพับบรรทัดข้อความยาว */}
              <SelectContent
                side="bottom"
                sideOffset={4}
                alignItemWithTrigger={false}
                className="w-[var(--anchor-width)] max-w-[calc(100vw-3rem)]"
              >
                {coursesToSelect.map((c) => (
                  <SelectItem
                    key={c.courseId}
                    value={c.courseId}
                    className="whitespace-normal py-2 text-left text-sm leading-snug"
                  >
                    {c.courseId} - {c.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2. เลือกเวลา */}
          <div className="grid gap-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* 3. ชื่อ นศ. */}
          <div className="grid gap-2">
            <Label htmlFor="student-name">ชื่อ นศ.</Label>
            <Input
              id="student-name"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
              className="bg-muted text-muted-foreground"
            />
          </div>

          {/* 4. โปรแกรม */}
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
