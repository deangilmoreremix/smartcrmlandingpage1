import React, { useState, useMemo } from "react";
import { Check, X, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { competitorComparisonData } from "../data/competitorData";
import JVZooBuyButton from "./JVZooBuyButton";
import JVZooNoThanksButton from "./JVZooNoThanksButton";

const PricingComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Dashboard", "Contacts", "Pipeline", "Calendar", "All"];

  const getFilteredData = useMemo(() => {
    let filtered = competitorComparisonData;
    if (activeTab !== "All") {
      const keyword = activeTab.toLowerCase();
      filtered = filtered.filter(item => item.feature.toLowerCase().includes(keyword));
    }
    if (searchQuery) {
      filtered = filtered.filter(item => item.feature.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [activeTab, searchQuery]);

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? <Check className="text-green-500 mx-auto w-5 h-5" /> : <X className="text-red-500 mx-auto w-5 h-5" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Pricing Comparison</h3>

      {/* Pricing Section with Buy Buttons */}
      <div className="flex flex-col items-center mb-8">
        <div className="text-center">
          <h4 className="text-orange-400 font-semibold">One-Time Plan</h4>
          <p className="text-white">$97</p>
          <JVZooBuyButton className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded inline-block">
            Buy Now
          </JVZooBuyButton>
        </div>
        <JVZooNoThanksButton className="mt-3" />
      </div>

      {/* Tabs and Search */}
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 mb-4">
            {tabs.map(tab => (
              <TabsTrigger key={tab} value={tab} className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative mb-4 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-white/20 rounded-lg">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 p-3 text-left text-white font-semibold min-w-[200px]">Feature</th>
              <th className="border border-white/20 p-3 text-center text-blue-400 font-semibold min-w-[120px]">SmartCRM</th>
              <th className="border border-white/20 p-3 text-center text-blue-400 font-semibold min-w-[120px]">Salesforce</th>
              <th className="border border-white/20 p-3 text-center text-orange-400 font-semibold min-w-[120px]">HubSpot</th>
              <th className="border border-white/20 p-3 text-center text-green-400 font-semibold min-w-[120px]">Pipedrive</th>
              <th className="border border-white/20 p-3 text-center text-purple-400 font-semibold min-w-[120px]">Keap</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredData.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white/5" : ""}>
                <td className="border border-white/20 p-3 text-white font-medium">{item.feature}</td>
                <td className="border border-white/20 p-3 text-center">{renderCell(item.smartcrm)}</td>
                <td className="border border-white/20 p-3 text-center">{renderCell(item.salesforce)}</td>
                <td className="border border-white/20 p-3 text-center">{renderCell(item.hubspot)}</td>
                <td className="border border-white/20 p-3 text-center">{renderCell(item.pipedrive)}</td>
                <td className="border border-white/20 p-3 text-center">{renderCell(item.keap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingComparison;