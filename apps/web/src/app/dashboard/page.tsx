import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-5">
      <p>Hello from Mit</p>
      <Button>Hello</Button>
      <Button variant={"outline"}>Hello</Button>
    </div>
  );
};

export default Dashboard;
