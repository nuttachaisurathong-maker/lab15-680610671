import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-xl space-y-4 pt-6">
      <div className="rounded-2xl border bg-card p-6 shadow-xs">
        <h1 className="text-base font-bold text-foreground">
          ระบบลงทะเบียนเรียน CPE & ISNE
        </h1>
        <div className="mt-4">
          <Link to="/enrollment">
            <Button>ไปหน้าลงทะเบียนเรียน</Button>
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        จัดทำโดย {currentUser.name} รหัสนักศึกษา {currentUser.studentId}
      </p>
    </div>
  );
}
