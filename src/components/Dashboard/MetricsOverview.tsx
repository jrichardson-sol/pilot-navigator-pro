import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

export const MetricsOverview = () => {
  const metrics = [
    {
      title: "Active Pilots",
      value: "4",
      icon: TrendingUp,
      trend: "+2 this month",
      trendUp: true,
    },
    {
      title: "Success Rate",
      value: "75%",
      icon: CheckCircle,
      trend: "+5% vs last month",
      trendUp: true,
    },
    {
      title: "Risk Level",
      value: "Low",
      icon: AlertCircle,
      trend: "2 potential issues",
      trendUp: false,
    },
    {
      title: "Avg. Completion",
      value: "45 days",
      icon: Clock,
      trend: "-5 days vs target",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.trendUp ? "text-green-600" : "text-red-600"} mt-1`}>
              {metric.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};