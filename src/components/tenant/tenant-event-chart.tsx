"use client";

import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis} from "recharts";
import {ChartContainer} from "@/components/ui/chart";

export type TenantEventChartProps = {
  chartData: any[];
};

export const TenantEventChart = ({chartData}: TenantEventChartProps) => {
  const formattedData = chartData.map((day) => {
    const dayData: any = {date: day._id};

    day.events.forEach((event: any) => {
      dayData[event.type] = event.count;
    });

    return dayData;
  });

  const eventTypes = Array.from(
    new Set(chartData.flatMap((day) => day.events.map((event: any) => event.type))),
  );

  return (
    <ChartContainer config={{}}>
      <LineChart accessibilityLayer data={formattedData}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <Tooltip />
        <Legend />
        {eventTypes.map((type, index) => (
          <Line
            key={type}
            activeDot={{r: 8}}
            dataKey={type}
            stroke={`hsl(${(index * 360) / eventTypes.length}, 60%, 50%)`}
            type="linear"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};
TenantEventChart.displayName = "TenantEventChart";
