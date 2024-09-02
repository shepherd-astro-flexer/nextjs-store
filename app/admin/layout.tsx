import SectionTitle from "@/components/global/SectionTitle";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTitle text="Dashboard" />
      <section className="grid gap-12 mt-12 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 px-4">{children}</div>
      </section>
    </>
  );
}
export default DashboardLayout;
