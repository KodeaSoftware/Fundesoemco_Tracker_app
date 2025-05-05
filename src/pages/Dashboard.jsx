import Header from "../ui/Header";
import PresentesHoyCard from "../ui/PresentesHoyCard";
import AusentesHoyCard from "../ui/AusentesHoyCard";
function Dashboard() {
  return (
    <div className="bg-gray-50 w-screen min-h-screen overflow-hidden">
      <Header pageTitle="Dashboard" />

      <div className="px-9 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PresentesHoyCard />
        <AusentesHoyCard />
      </div>
    </div>
  );
}

export default Dashboard;
