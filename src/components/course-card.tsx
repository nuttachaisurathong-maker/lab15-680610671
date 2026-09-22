import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatThaiDateTime } from "@/lib/utils";

type CourseCardProps = {
  course: Course & { isEnrolled?: boolean; enrolledAt?: string };
  student: Student;
  enrolledAt?: string;
  isEnrolled?: boolean;
  onUnenroll?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled: isEnrolledProp,
  onUnenroll,
}: CourseCardProps) {
  const isEnrolled = isEnrolledProp ?? course.isEnrolled ?? Boolean(enrolledAt);
  const displayTime = enrolledAt ?? course.enrolledAt;

  return (
    <Card className="transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-base font-bold text-foreground">
            {course.courseTitle}
          </CardTitle>
          <CardDescription className="mt-1">
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {isEnrolled ? (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-600 bg-amber-500/10 dark:border-purple-500 dark:text-purple-400 dark:bg-purple-500/10 shrink-0 font-normal"
          >
            ลงทะเบียนแล้ว
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-600 bg-purple-500/10 dark:border-amber-500 dark:text-amber-400 dark:bg-amber-500/10 shrink-0 font-normal"
          >
            เปิดรับ
          </Badge>
        )}
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between border-t pt-3">
          <div className="space-y-0.5 text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatThaiDateTime(displayTime)}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onUnenroll?.(course.courseId)}
            title="ยกเลิกการลงทะเบียน"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
