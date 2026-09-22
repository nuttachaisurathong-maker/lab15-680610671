import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses as initialCourses,
  currentStudent,
  currentUser,
  enrollments as initialEnrollments,
  students,
} from "@/lib/mock-data";

export default function EnrollmentPage() {
  const student =
    currentStudent ??
    students.find((s) => s.studentId === "650610002") ??
    students[0];

  const [enrollments, setEnrollments] = useState(
    initialEnrollments.filter((e) => e.studentId === student.studentId),
  );

  const handleEnroll = (courseId: string, enrollTime: string) => {
    setEnrollments((prev) => [
      ...prev,
      {
        studentId: student.studentId,
        courseId,
        enrolledAt: enrollTime,
      },
    ]);
  };

  const handleUnenroll = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter(
        (e) => !(e.studentId === student.studentId && e.courseId === courseId),
      ),
    );
  };

  const courseList = initialCourses.map((course) => {
    const userEnrollment = enrollments.find(
      (e) => e.courseId === course.courseId,
    );
    return {
      ...course,
      isEnrolled: Boolean(userEnrollment),
      enrolledAt: userEnrollment?.enrolledAt,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            รายวิชาทั้งหมด
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {currentUser.name} ({currentUser.studentId})
          </p>
        </div>

        <RegisterDialog
          courses={courseList}
          student={student}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-3">
        {courseList.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={student}
            enrolledAt={course.enrolledAt}
            isEnrolled={course.isEnrolled}
            onUnenroll={handleUnenroll}
          />
        ))}
      </div>
    </div>
  );
}
